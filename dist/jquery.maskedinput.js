/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2013 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.3.1
*/
!function($) {
    function getPasteEvent() {
        var el = document.createElement("input"), name = "onpaste";
        return el.setAttribute(name, ""), "function" == typeof el[name] ? "paste" : "input";
    }
    var caretTimeoutId, pasteEventName = getPasteEvent() + ".mask", ua = navigator.userAgent, iPhone = /iphone/i.test(ua), chrome = /chrome/i.test(ua), android = /android/i.test(ua);
    $.mask = {
        definitions: {
            "9": "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
    }, $.fn.extend({
        caret: function(begin, end) {
            var range;
            if (0 !== this.length && !this.is(":hidden")) return "number" == typeof begin ? (end = "number" == typeof end ? end : begin, 
            this.each(function() {
                this.setSelectionRange ? this.setSelectionRange(begin, end) : this.createTextRange && (range = this.createTextRange(), 
                range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin), 
                range.select());
            })) : (this[0].setSelectionRange ? (begin = this[0].selectionStart, end = this[0].selectionEnd) : document.selection && document.selection.createRange && (range = document.selection.createRange(), 
            begin = 0 - range.duplicate().moveStart("character", -1e5), end = begin + range.text.length), 
            {
                begin: begin,
                end: end
            });
        },
        unmask: function() {
            return this.trigger("unmask");
        },
        mask: function(mask, settings) {
            var input, defs, tests, partialPosition, firstNonMaskPos, len;
            return !mask && this.length > 0 ? (input = $(this[0]), input.data($.mask.dataName)()) : (settings = $.extend({
                autoclear: $.mask.autoclear,
                placeholder: $.mask.placeholder,
                completed: null
            }, settings), defs = $.mask.definitions, tests = [], partialPosition = len = mask.length, 
            firstNonMaskPos = null, $.each(mask.split(""), function(i, c) {
                "?" == c ? (len--, partialPosition = i) : defs[c] ? (tests.push(new RegExp(defs[c])), 
                null === firstNonMaskPos && (firstNonMaskPos = tests.length - 1)) : tests.push(null);
            }), this.trigger("unmask").each(function() {
                function seekNext(pos) {
                    for (;++pos < len && !tests[pos]; ) ;
                    return pos;
                }
                function seekPrev(pos) {
                    for (;--pos >= 0 && !tests[pos]; ) ;
                    return pos;
                }
                function shiftL(begin, end) {
                    var i, j;
                    if (!(0 > begin)) {
                        for (i = begin, j = seekNext(end); len > i; i++) if (tests[i]) {
                            if (!(len > j && tests[i].test(buffer[j]))) break;
                            buffer[i] = buffer[j], buffer[j] = settings.placeholder, j = seekNext(j);
                        }
                        writeBuffer(), input.caret(Math.max(firstNonMaskPos, begin));
                    }
                }
                function shiftR(pos) {
                    var i, c, j, t;
                    for (i = pos, c = settings.placeholder; len > i; i++) if (tests[i]) {
                        if (j = seekNext(i), t = buffer[i], buffer[i] = c, !(len > j && tests[j].test(t))) break;
                        c = t;
                    }
                }
                function keydownEvent(e) {
                    var pos, begin, end, k = e.which;
                    8 === k || 46 === k || iPhone && 127 === k ? (pos = input.caret(), begin = pos.begin, 
                    end = pos.end, 0 === end - begin && (begin = 46 !== k ? seekPrev(begin) : end = seekNext(begin - 1), 
                    end = 46 === k ? seekNext(end) : end), clearBuffer(begin, end), shiftL(begin, end - 1), 
                    e.preventDefault()) : 27 == k && (input.val(focusText), input.caret(0, checkVal()), 
                    e.preventDefault());
                }
                function keypressEvent(e) {
                    var p, c, next, k = e.which, pos = input.caret();
                    if (0 == k) {
                        if (pos.begin >= len) return input.val(input.val().substr(0, len)), e.preventDefault(), 
                        !1;
                        pos.begin == pos.end && (k = input.val().charCodeAt(pos.begin - 1), pos.begin--, 
                        pos.end--);
                    }
                    e.ctrlKey || e.altKey || e.metaKey || 32 > k || k && (0 !== pos.end - pos.begin && (clearBuffer(pos.begin, pos.end), 
                    shiftL(pos.begin, pos.end - 1)), p = seekNext(pos.begin - 1), len > p && (c = String.fromCharCode(k), 
                    tests[p].test(c) && (shiftR(p), buffer[p] = c, writeBuffer(), next = seekNext(p), 
                    android ? setTimeout($.proxy($.fn.caret, input, next), 0) : input.caret(next), settings.completed && next >= len && settings.completed.call(input))), 
                    e.preventDefault());
                }
                function clearBuffer(start, end) {
                    var i;
                    for (i = start; end > i && len > i; i++) tests[i] && (buffer[i] = settings.placeholder);
                }
                function writeBuffer() {
                    input.val(buffer.join(""));
                }
                function checkVal(allow) {
                    var i, c, pos, test = input.val(), lastMatch = -1;
                    for (i = 0, pos = 0; len > i; i++) if (tests[i]) {
                        for (buffer[i] = settings.placeholder; pos++ < test.length; ) if (c = test.charAt(pos - 1), 
                        tests[i].test(c)) {
                            buffer[i] = c, lastMatch = i;
                            break;
                        }
                        if (pos > test.length) break;
                    } else buffer[i] === test.charAt(pos) && i !== partialPosition && (pos++, lastMatch = i);
                    return allow ? writeBuffer() : partialPosition > lastMatch + 1 ? settings.autoclear || buffer.join("") === defaultBuffer ? (input.val(""), 
                    clearBuffer(0, len)) : writeBuffer() : (writeBuffer(), input.val(input.val().substring(0, lastMatch + 1))), 
                    partialPosition ? i : firstNonMaskPos;
                }
                var input = $(this), buffer = $.map(mask.split(""), function(c) {
                    return "?" != c ? defs[c] ? settings.placeholder : c : void 0;
                }), defaultBuffer = buffer.join(""), focusText = input.val();
                input.data($.mask.dataName, function() {
                    return $.map(buffer, function(c, i) {
                        return tests[i] && c != settings.placeholder ? c : null;
                    }).join("");
                }), input.attr("readonly") || input.one("unmask", function() {
                    input.unbind(".mask").removeData($.mask.dataName);
                }).bind("focus.mask", function() {
                    clearTimeout(caretTimeoutId);
                    var pos;
                    focusText = input.val(), pos = checkVal(), caretTimeoutId = setTimeout(function() {
                        writeBuffer(), pos == mask.length ? input.caret(0, pos) : input.caret(pos);
                    }, 10);
                }).bind("blur.mask", function() {
                    checkVal(), input.val() != focusText && input.change();
                }).bind("keydown.mask", keydownEvent).bind("keypress.mask", keypressEvent).bind(pasteEventName, function() {
                    setTimeout(function() {
                        var pos = checkVal(!0);
                        input.caret(pos), settings.completed && pos == input.val().length && settings.completed.call(input);
                    }, 0);
                }), chrome && android && input.bind("keyup.mask", keypressEvent), checkVal();
            }));
        }
    });
}(jQuery);