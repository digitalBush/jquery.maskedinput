(function(){
    "use strict";
    function FixedWidthMask (mask, settings){
        var self=this;
        //Build up structures necessary to quickly apply masking
        this.settings = settings;

        this.tests = [];
        this.partialPosition = mask.length;
        this.length = mask.length;

        var firstNonMaskPos = null;

        $.each(mask.split(""), function(i, c) {
            if (c == '?') {
                self.length--;
                self.partialPosition = i;
            } else if (settings.definitions[c]) {
                self.tests.push(new RegExp(settings.definitions[c]));
                if (firstNonMaskPos === null) {
                    firstNonMaskPos = self.tests.length - 1;
                }
            } else {
                self.tests.push(c);
            }
        });
    }

    FixedWidthMask.prototype.applyBackspace = function(input, pos){
        var i, buffer = input.split('');
        for(i = pos - 1; i >= 0; i--){
            if(this.tests[i].test){
                break;
            }
        }
        buffer.splice(i, 1);
        var result= this.apply(buffer.join(''), i, true);
        result.pos=i;
        return result;
    };

    FixedWidthMask.prototype.applyDelete = function(input, pos){
        var i, buffer = input.split('');
        for(i = pos; i < buffer.length; i++){
            if(this.tests[i].test){
                break;
            }
        }
        buffer.splice(i, 1);
        var result=this.apply(buffer.join(''), i, true);
        result.pos=i;
        return result;
    };

    FixedWidthMask.prototype.apply = function(inputString, caretPosition, doShift){
        if(caretPosition == null){
            caretPosition = this.length;
        }

        var input=inputString.split(''),
            buffer=[],
            raw=[],
            lastMatch = -1,
            i,
            action,
            pos;

        for (i = 0, pos = 0; i < this.length; i++) {
            action=this.tests[i];

            if (action.test) {
                buffer.push(this.settings.placeholder);

                while (pos++ < input.length) {
                    var c = input[pos - 1];
                    if (action.test(c)) {
                        buffer[i] = c;
                        raw.push(c);
                        lastMatch = i;
                        break;
                    }else if(doShift){
                        //TODO: The following is awful and needs to be refactored.
                        var tests;
                        /* jshint ignore:start */
                        tests=$.map(this.tests.slice(i + 1), function(test, offset){
                            var index = pos - 1 + offset;
                            if(test.test && input[index] != null){
                                return {regex:test,char:input[index]};
                            }
                        });
                        /* jshint ignore:end */

                        var newInput = [];
                        var canShift = tests.length > 0;

                        if(tests.length){
                            tests.unshift({regex: action});
                            for(var j = 1; j < tests.length; j++){
                                if(!tests[j-1].regex.test(tests[j].char)){
                                    canShift = false;
                                    break;
                                }
                                newInput.push(tests[j].char);
                            }
                        }

                        if(canShift){
                            //Everything to the right can shift left and still match.
                            input = newInput;
                            buffer[i] = input[0];
                            pos = 1;
                        }else{
                            //Retry current char at next position leaving a blank.
                            pos--;
                        }
                        //Only allow shift attempt to happen once.
                        doShift = false;
                        break;
                    }
                }
            } else {
                buffer.push(action);
                if(action === input[pos] && i !== this.partialPosition) {
                    pos++;
                }
            }
        }

        //Find the next spot waiting for input
        var maxCaret=Math.min(caretPosition,this.length);
        for(i=Math.min(lastMatch+1,maxCaret);i<this.length;i++){
            if(this.tests[i].test){
                break;
            }
        }

        var trimmed=buffer;
        if(this.partialPosition < this.length){
            trimmed = buffer.slice(0, Math.max(this.partialPosition,lastMatch+1));
        }

        if(!this.settings.autoclear){
            trimmed = buffer.slice(0,i);
        }

        //TODO: better names for these props
        var result={
            value: buffer.join(''), //Prompt Value
            trimmed: trimmed.join(''), //Display Value
            raw: raw.join(''), //Raw Value, TODO: separate unmask call?
            pos: i , //(partialPosition ? i : firstNonMaskPos)
            isComplete: (lastMatch + 1) >= this.partialPosition
        };
        return result;
    };
    $.mask.masks.fixed = FixedWidthMask;
})(jQuery);
