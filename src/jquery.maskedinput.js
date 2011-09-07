/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-@Year Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license) 
	Version: @version
*/
(function($) {
	var pasteEventName = ($.browser.msie ? 'paste' : 'input') + ".mask";
	var iPhone = (window.orientation != undefined);

	$.mask = {
		//Predefined character definitions
		definitions: {
			'9': "[0-9]",
			'a': "[A-Za-z]",
			'*': "[A-Za-z0-9]"
		},
		dataName:"rawMaskFn",
		extraData: "maskedit.extra"
	};

	$.fn.extend({
		//Helper Function for Caret positioning
		caret: function(begin, end) {
			if (this.length == 0) return;
			if (typeof begin == 'number') {
				end = (typeof end == 'number') ? end : begin;
				return this.each(function() {
					if (this.setSelectionRange) {
						this.setSelectionRange(begin, end);
					} else if (this.createTextRange) {
						var range = this.createTextRange();
						range.collapse(true);
						range.moveEnd('character', end);
						range.moveStart('character', begin);
						range.select();
					}
				});
			} else {
				if (this[0].setSelectionRange) {
					begin = this[0].selectionStart;
					end = this[0].selectionEnd;
				} else if (document.selection && document.selection.createRange) {
					var range = document.selection.createRange();
					begin = 0 - range.duplicate().moveStart('character', -100000);
					end = begin + range.text.length;
				}
				return { begin: begin, end: end };
			}
		},
		unmask: function() { return this.trigger("unmask"); },
		mask: function(mask, settings) {
			if (!mask && this.length > 0) {
				var input = $(this[0]);
				return input.data($.mask.dataName)(input);
			}
			settings = $.extend({
				placeholder: "_",
				completed: null
			}, settings);

			var defs = $.mask.definitions;
			var tests = [];
			var partialPosition = mask.length;
			var firstNonMaskPos = null;
			var len = mask.length;

			$.each(mask.split(""), function(i, c) {
				if (c == '?') {
					len--;
					partialPosition = i;
				} else if (defs[c]) {
					tests.push(new RegExp(defs[c]));
					if(firstNonMaskPos==null)
						firstNonMaskPos = tests.length - 1;
				} else {
					tests.push(null);
				}
			});

			return this.trigger("unmask").each(function() {
				var input = $(this);
				input.data($.mask.extraData, { focusText: input.val() });

				function extra(input) {
					var data = input.data($.mask.extraData);
					if (data.input !== input[0]) {
						data = $.extend({}, data, {
							input: input[0],
							buffer: $.map(mask.split(""), function(c, i) { 
								if (c != '?') return defs[c] ? settings.placeholder : c 
							})
						});
						input.data($.mask.extraData, data);
					}
					return data;
				}

				function focusText(input, val) {
					if (arguments.length > 1) 
						return extra(input).focusText = val;
					return extra(input).focusText;
				}

				function getBuffer(input) {
					return extra(input).buffer;
				}

				focusText(input, input.val());

				function seekNext(pos) {
					while (++pos <= len && !tests[pos]);
					return pos;
				};
				function seekPrev(pos) {
					while (--pos >= 0 && !tests[pos]);
					return pos;
				};

				function shiftL(input, begin,end) {
					if(begin<0)
						 return;
					var buffer = getBuffer(input);
					for (var i = begin,j = seekNext(end); i < len; i++) {
						if (tests[i]) {
							if (j < len && tests[i].test(buffer[j])) {
								buffer[i] = buffer[j];
								buffer[j] = settings.placeholder;
							} else
								break;
							j = seekNext(j);
						}
					}
					writeBuffer(input);
					input.caret(Math.max(firstNonMaskPos, begin));
				};

				function shiftR(input, pos) {
					var buffer = getBuffer(input);
					for (var i = pos, c = settings.placeholder; i < len; i++) {
						if (tests[i]) {
							var j = seekNext(i);
							var t = buffer[i];
							buffer[i] = c;
							if (j < len && tests[j].test(t))
								c = t;
							else
								break;
						}
					}
				};

				function keydownEvent(e) {
					var k=e.which;
					var input = $(this);

					//backspace, delete, and escape get special treatment
					if(k == 8 || k == 46 || (iPhone && k == 127)){
						var pos = input.caret(),
							begin = pos.begin,
							end = pos.end;
						
						if(end-begin==0){
							begin=k!=46?seekPrev(begin):(end=seekNext(begin-1));
							end=k==46?seekNext(end):end;
						}
						clearBuffer(input, begin, end);
						shiftL(input, begin, end-1);

						return false;
					} else if (k == 27) {//escape
						input.val(focusText(input));
						input.caret(0, checkVal(input));
						return false;
					}
				};

				function keypressEvent(e) {
					var input = $(this);
					var k = e.which,
						pos = input.caret();
					if (e.ctrlKey || e.altKey || e.metaKey || k<32) {//Ignore
						return true;
					} else if (k) {
						if(pos.end-pos.begin!=0){
							clearBuffer(input, pos.begin, pos.end);
							shiftL(input, pos.begin, pos.end-1);
						}

						var p = seekNext(pos.begin - 1);
						if (p < len) {
							var c = String.fromCharCode(k);
							if (tests[p].test(c)) {
								shiftR(input, p);
								(getBuffer(input))[p] = c;
								writeBuffer(input);
								var next = seekNext(p);
								input.caret(next);
								if (settings.completed && next >= len)
									settings.completed.call(input);
							}
						}
						return false;
					}
				};

				function clearBuffer(input, start, end) {
					var buffer = getBuffer(input);
					for (var i = start; i < end && i < len; i++) {
						if (tests[i])
							buffer[i] = settings.placeholder;
					}
				};

				function writeBuffer(input) { 
					var buffer = getBuffer(input);
					return input.val(buffer.join('')).val(); 
				};

				function checkVal(input, allow) {
					//try to place characters where they belong
					var test = input.val();
					var lastMatch = -1;
					var buffer = getBuffer(input);
					for (var i = 0, pos = 0; i < len; i++) {
						if (tests[i]) {
							buffer[i] = settings.placeholder;
							while (pos++ < test.length) {
								var c = test.charAt(pos - 1);
								if (tests[i].test(c)) {
									buffer[i] = c;
									lastMatch = i;
									break;
								}
							}
							if (pos > test.length)
								break;
						} else if (buffer[i] == test.charAt(pos) && i!=partialPosition) {
							pos++;
							lastMatch = i;
						}
					}
					if (!allow && lastMatch + 1 < partialPosition) {
						input.val("");
						clearBuffer(input, 0, len);
					} else if (allow || lastMatch + 1 >= partialPosition) {
						writeBuffer(input);
						if (!allow) input.val(input.val().substring(0, lastMatch + 1));
					}
					return (partialPosition ? i : firstNonMaskPos);
				};

				input.data($.mask.dataName,function(input){
					return $.map(getBuffer(input), function(c, i) {
						return tests[i]&&c!=settings.placeholder ? c : null;
					}).join('');
				})

				if (!input.attr("readonly"))
					input
					.one("unmask", function() {
						$(this)
							.unbind(".mask")
							.removeData($.mask.dataName)
							.removeData($.mask.extraData);
					})
					.bind("focus.mask", function() {
						var input = $(this);
						focusText(input, input.val());
						var pos = checkVal(input);
						writeBuffer(input);
						var moveCaret=function(){
							if (pos == mask.length)
								input.caret(0, pos);
							else
								input.caret(pos);
						};
						($.browser.msie ? moveCaret:function(){setTimeout(moveCaret,0)})();
					})
					.bind("blur.mask", function() {
						var input = $(this);
						checkVal(input);
						if (input.val() != focusText(input))
							input.change();
					})
					.bind("keydown.mask", keydownEvent)
					.bind("keypress.mask", keypressEvent)
					.bind(pasteEventName, function() {
						var input = $(this);
						setTimeout(function() { input.caret(checkVal(input, true)); }, 0);
					});

				checkVal(input); //Perform initial check for existing values
			});
		}
	});
})(jQuery);
