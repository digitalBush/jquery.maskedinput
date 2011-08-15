var $, iPhone, pasteEventName;
$ = jQuery;
pasteEventName = ($.browser.msie ? 'paste' : 'input') + '.mask';
iPhone = window.orientation != null;
$.mask = {
  definitions: {
    '9': "[0-9]",
    'a': "[A-Za-z]",
    '*': "[A-Za-z0-9]",
    'm': "[0-9/]",
    'd': "[0-9/]",
    'y': "[0-9/]"
  },
  dataName: "rawMaskFn",
  autocomplete_predefined: {
    'mmddyyyy': [
      {
        pattern: /^(\d)\//,
        replacement: "0$1"
      }, {
        pattern: /^1[3-9]/,
        replacement: "  "
      }, {
        pattern: /^(\d\d.)((3[2-9])|([4-9]\d))/,
        replacement: "$1  "
      }, {
        pattern: /^(\d\d.)(\d\/)./,
        replacement: "$1" + "0" + "$2"
      }, {
        pattern: /^(\d\d.\d\d.)(1[0-8]|0\d|2[1-9])(?!\d)/,
        replacement: "$1" + "20" + "$2"
      }, {
        pattern: /^(\d\d.\d\d.)([3-8]\d)(?!\d)/,
        replacement: "$1" + "19" + "$2"
      }
    ],
    'mmyyyy': [
      {
        pattern: /^(\d)\//,
        replacement: "0$1"
      }, {
        pattern: /^1[3-9]/,
        replacement: "  "
      }, {
        pattern: /^(\d\d.)(1[0-8]|0\d|2[1-9])(?!\d)/,
        replacement: "$1" + "20" + "$2"
      }, {
        pattern: /^(\d\d.)([3-8]\d)(?!\d)/,
        replacement: "$1" + "19" + "$2"
      }
    ]
  }
};
$.fn.extend({
  caret: function(begin, end) {
    var range;
    if (this.length === 0) {
      return;
    }
    if (typeof begin === 'number') {
      end = typeof end === 'number' ? end : begin;
      return this.each(function() {
        var range;
        if (this.setSelectionRange) {
          return this.setSelectionRange(begin, end);
        } else if (this.createTextRange) {
          range = this.createTextRange;
          range.collapse(true);
          range.moveEnd('character', end);
          range.moveStart('character', begin);
          return range.select;
        }
      });
    } else {
      if (this[0].setSelectionRange) {
        begin = this[0].selectionStart;
        end = this[0].selectionEnd;
      } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange;
        begin = 0 - range.duplicate().moveStart('character', -100000);
        end = begin + range.text.length;
      }
      return {
        begin: begin,
        end: end
      };
    }
  },
  unmask: function() {
    return this.trigger("unmask");
  },
  mask: function(mask, settings) {
    var defs, firstNonMaskPos, input, len, partialPosition, tests;
    if (!mask && this.length > 0) {
      input = $(this[0]);
      return (input.data($.mask.dataName))();
    }
    settings = $.extend({
      placeholder: "_",
      completed: null,
      autocomplete: [],
      progessive_reveal: false
    }, settings);
    defs = $.mask.definitions;
    tests = [];
    partialPosition = mask.length;
    firstNonMaskPos = null;
    len = mask.length;
    $.each(mask.split(""), function(i, c) {
      if (c === '?') {
        len--;
        return partialPosition = i;
      } else if (defs[c]) {
        tests.push(RegExp(defs[c]));
        if (firstNonMaskPos === null) {
          return firstNonMaskPos = tests.length - 1;
        }
      } else {
        return tests.push(null);
      }
    });
    return (this.trigger("unmask")).each(function() {
      var buffer, checkVal, clearBuffer, focusText, keydownEvent, keypressEvent, seekNext, seekPrev, shiftL, shiftR, wbCount, writeBuffer;
      input = $(this);
      buffer = $.map(mask.split(""), function(c, i) {
        if (c !== '?') {
          if (defs[c]) {
            return settings.placeholder;
          } else {
            return c;
          }
        }
      });
      focusText = input.val();
      seekNext = function(pos) {
        while (++pos <= len && !tests[pos]) {
          null;
        }
        return pos;
      };
      seekPrev = function(pos) {
        var ivala;
        ivala = input.val().split("");
        while (--pos >= 0 && !tests[pos]) {
          ivala[pos] = settings.placeholder;
        }
        ivala[pos] = settings.placeholder;
        input.val(ivala.join(""));
        return pos;
      };
      shiftL = function(begin, end) {
        var i, j;
        if (begin < 0) {
          return null;
        }
        j = seekNext(end);
        for (i = begin; begin <= len ? i < len : i > len; begin <= len ? i++ : i--) {
          if (tests[i]) {
            if (j < len && tests[i].test(buffer[j])) {
              buffer[i] = buffer[j];
              buffer[j] = settings.placeholder;
            } else {
              break;
            }
            j = seekNext(j);
          }
        }
        writeBuffer();
        return input.caret(Math.max(firstNonMaskPos, begin));
      };
      shiftR = function(pos) {
        var c, i, j, t, _results;
        c = settings.placeholder;
        _results = [];
        for (i = pos; pos <= len ? i < len : i > len; pos <= len ? i++ : i--) {
          if (tests[i]) {
            j = seekNext(i);
            t = buffer[i];
            buffer[i] = c;
            if (j < len && tests[j].test(t)) {
              c = t;
            } else {
              break;
            }
          }
        }
        return _results;
      };
      keydownEvent = function(e) {
        var begin, end, k, _ref;
        k = e.which;
        if (k === 8 || k === 46 || (iPhone && k === 127)) {
          _ref = input.caret(), begin = _ref.begin, end = _ref.end;
          console.dir(input.caret());
          if (end === begin) {
            begin = k !== 46 ? seekPrev(begin) : end = seekNext(begin - 1);
            if (k === 46) {
              end = seekNext(end);
            }
          }
          clearBuffer(begin, end);
          shiftL(begin, end - 1);
          return false;
        } else if (k === 27) {
          input.val(focusText);
          input.caret(0, checkVal());
          return false;
        }
      };
      keypressEvent = function(e) {
        var c, i, k, next, p, pattern, pos, replacement, startLength, _ref, _ref2;
        k = e.which;
        i = 0;
        startLength = input.mask().length;
        pos = input.caret();
        if (e.ctrlKey || e.altKey || e.metaKey || k < 32) {
          return true;
        } else if (k) {
          if (pos.end !== pos.begin) {
            clearBuffer(pos.begin, pos.end);
            shiftL(pos.begin, pos.end - 1);
          }
          p = seekNext(pos.begin - 1);
          if (p < len) {
            c = String.fromCharCode(k);
            if (tests[p].test(c)) {
              shiftR(p);
              buffer[p] = c;
              writeBuffer();
              next = seekNext(p);
              input.caret(next);
              if (settings.autocomplete.length > 0) {
                for (i = 0, _ref = settings.autocomplete.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
                  _ref2 = settings.autocomplete[i], pattern = _ref2.pattern, replacement = _ref2.replacement;
                  input.val(input.val().replace(pattern, replacement));
                  clearBuffer(0, RegExp.lastMatch.length);
                  input.caret(checkVal(true));
                }
              }
              next += input.mask().length - startLength - 1;
              if (settings.completed && next >= len) {
                settings.completed.call(input);
              }
            }
          }
          return false;
        }
      };
      clearBuffer = function(start, end) {
        var i, _results;
        _results = [];
        for (i = start; start <= end ? i < end : i > end; start <= end ? i++ : i--) {
          if (i < len) {
            _results.push(tests[i] != null ? buffer[i] = settings.placeholder : void 0);
          }
        }
        return _results;
      };
      wbCount = 0;
      writeBuffer = function() {
        var i, ival, tmp_array, _ref;
        if (settings.progressive_reveal) {
          i = 0;
          tmp_array = [];
          ival = input.val();
          while (!(!(ival[i] != null) || (ival[i] === (_ref = buffer[i]) && _ref === settings.placeholder))) {
            tmp_array.push(ival[i++]);
          }
          while (buffer[i] && buffer[i] !== settings.placeholder) {
            tmp_array.push(buffer[i++]);
          }
          return (input.val(tmp_array.join(""))).val();
        } else {
          return (input.val(buffer.join(""))).val();
        }
      };
      checkVal = function(allow) {
        var c, i, lastMatch, pos, test;
        test = input.val();
        lastMatch = -1;
        pos = 0;
        for (i = 0; 0 <= len ? i < len : i > len; 0 <= len ? i++ : i--) {
          if (tests[i]) {
            buffer[i] = settings.placeholder;
            while (pos++ < test.length) {
              c = test.charAt(pos - 1);
              if (tests[pos - 1] && tests[pos - 1].test(c)) {
                buffer[i] = c;
                lastMatch = i;
                break;
              }
            }
            if (pos > test.length) {
              break;
            }
          } else if (buffer[i] === test.charAt(pos && i !== partialPosition)) {
            pos++;
            lastMatch = i;
          }
        }
        if (!allow && lastMatch + 1 < partialPosition) {
          input.val("");
          clearBuffer(0, len);
        } else if (allow || lastMatch + 1 >= partialPosition) {
          writeBuffer();
          if (!allow) {
            input.val(input.val().substring(0, lastMatch + 1));
          }
        }
        if (partialPosition) {
          return i;
        } else {
          return firstNonMaskPos;
        }
      };
      input.data($.mask.dataName, function() {
        return ($.map(buffer, function(c, i) {
          if (tests[i] && c !== settings.placeholder) {
            return c;
          } else {
            return null;
          }
        })).join('');
      });
      if (!input.attr("readonly")) {
        input.one("unmask", function() {
          input.unbind(".mask");
          return input.removeData($.mask.dataName);
        }).bind("focus.mask", function() {
          var moveCaret, pos;
          focusText = input.val();
          pos = checkVal();
          writeBuffer();
          moveCaret = function() {
            if (pos === mask.length) {
              return input.caret(0, pos);
            } else {
              return input.caret(pos);
            }
          };
          if ($.browser.msie) {
            return moveCaret;
          } else {
            return (function() {
              return setTimeout(moveCaret, 0);
            })();
          }
        }).bind("blur.mask", function() {
          checkVal();
          if (input.val() !== focusText) {
            return input.change();
          }
        }).bind("keydown.mask", keydownEvent).bind("keypress.mask", keypressEvent).bind(pasteEventName, function() {
          return setTimeout((function() {
            return input.caret(checkVal(true));
          }), 0);
        });
      }
      return checkVal();
    });
  }
});