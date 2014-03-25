(function($) {

    function setCaret(elm,begin,end){
        end = (typeof end === 'number') ? end : begin;

        if (elm.setSelectionRange) {
            elm.setSelectionRange(begin, end);
        } else if (elm.createTextRange) {
            var range = elm.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', begin);
            range.select();
        }
    }

    function getCaret(elm){
        var begin,end;
        if (elm.setSelectionRange) {
            begin = elm.selectionStart;
            end = elm.selectionEnd;
        } else if (document.selection && document.selection.createRange) {
            var range = document.selection.createRange();
            begin = 0 - range.duplicate().moveStart('character', -100000);
            end = begin + range.text.length;
        }
        return { begin: begin, end: end };
    }

    //TODO: alias as maskedinput?
    $.mask = {
        masks:{},
        //Predefined character definitions
        //TODO: Move these to the mask def itself.
        definitions: {
            '9': "[0-9]",
            'a': "[A-Za-z]",
            '*': "[A-Za-z0-9]"
        },
        autoclear: true,
        dataName: "maskedinput",
        placeholder: '_'
    };

    function getPasteEvent() {
        var el = document.createElement('input'),
        name = 'onpaste';
        el.setAttribute(name, '');
        return (typeof el[name] === 'function')?'paste':'input';
    }

    var pasteEventName = getPasteEvent() + ".mask";

    $.fn.extend({
        //TODO: Be a good citizen and get this down to only .mask()
        unmask: function() {
            return this.trigger("unmask");
        },
        //TODO: we need a conflict thing here, maybe only use maskedinput(or alias?)
        mask: function(format, settings) {
            var input;

            //TODO: make these more in line with newer plugin interaction guidelines.
            if (!format && this.length > 0) {
                input = $(this[0]);
                return input.data($.mask.dataName).apply(input.val()).raw;
            }

            settings = $.extend({
                definitions: $.mask.definitions,
                autoclear: $.mask.autoclear,
                placeholder: $.mask.placeholder,
                completed: null
            }, settings);

            //Hardcoded as fixed for now.
            var mask=new $.mask.masks.fixed(format, settings);

            return this.trigger("unmask").each(function() {
                var elm = this,
                input = $(this),
                focusText = elm.value;

                function blurEvent() {
                    var result = mask.apply(elm.value);
                    elm.value = result.trimmed;
                    if(settings.autoclear && !result.isComplete){
                        elm.value = "";
                    }

                    if (elm.value != focusText){
                        input.change();
                    }
                }

                function keydownEvent(e) {
                    var k = e.which;

                    //backspace, delete, enter, and escape get special treatment
                    if (k === 8 || k === 46) {
                        var pos = getCaret(elm);
                        var result;

                        if (pos.begin != pos.end) {
                            var buffer = elm.value.split('');
                            buffer.splice(pos.begin,pos.end - pos.begin);
                            result = mask.apply(buffer.join(''), pos.begin+1);
                            result.pos = pos.begin;
                        } else if( k == 8 ) {
                            result = mask.applyBackspace(elm.value, pos.begin);
                        } else {
                            result = mask.applyDelete(elm.value, pos.begin);
                        }

                        elm.value = result.value;
                        setCaret(elm, result.pos);
                        e.preventDefault();
                    } else if(k === 13) { // enter
                        blurEvent.call(this, e);
                    } else if (k === 27) { // escape
                        elm.value = focusText;
                        setCaret(elm, 0, focusText.length);
                        e.preventDefault();
                    }
                }

                function keypressEvent(e) {
                    var k = e.which,
                    pos = getCaret(elm);

                    if (e.ctrlKey || e.altKey || e.metaKey || k < 32) {//Ignore
                        return;
                    } else if (k && k !== 13) {
                        var buffer = elm.value.split('');
                        buffer.splice(pos.begin, pos.end - pos.begin, String.fromCharCode(k));
                        var result = mask.apply(buffer.join(''), pos.begin+1);

                        elm.value = result.value;
                        setCaret(elm, result.pos);
                        if(result.isComplete){
                            input.trigger("completed.mask");
                        }

                        e.preventDefault();

                        // if(android){
                        //     //Path for CSP Violation on FireFox OS 1.1
                        //     var proxy = function()
                        //     {
                        //
                        //         $.proxy(setCaret,elm,next);
                        //     }
                        //
                        //     setTimeout(proxy,0);
                        // }else{
                        //     setCaret(elm,next);
                        // }
                    }
                }

                var caretTimeoutId;
                function focusEvent(){
                    clearTimeout(caretTimeoutId);
                    var result = mask.apply(elm.value);
                    focusText = elm.value;

                    caretTimeoutId = setTimeout(function(){
                        elm.value = result.value;
                        if (result.isComplete) {
                            setCaret(elm, 0, result.pos);
                        } else {
                            setCaret(elm, result.pos);
                        }
                    }, 10);
                }

                function pasteEvent(){
                    setTimeout(function() {
                        var pos = getCaret(elm);
                        var result = mask.apply(elm.value, pos.end);
                        elm.value = result.value;
                        setCaret(elm, result.pos);
                        if(result.isComplete){
                            input.trigger("completed.mask");
                        }
                    }, 0);
                }
                input.data($.mask.dataName,mask);

                if (!input.attr("readonly")){
                    input
                    .one("unmask", function() {
                        input
                        .off(".mask")
                        .removeData($.mask.dataName);
                    })
                    .on("focus.mask",focusEvent)
                    .on("blur.mask", blurEvent)
                    .on("keydown.mask", keydownEvent)
                    .on("keypress.mask", keypressEvent)
                    .on(pasteEventName, pasteEvent);
                }

                // if (chrome && android) {
                //     input.on("keyup.mask", keypressEvent);
                // }

                //Apply initital mask
                if(elm.value.length){
                    var result=mask.apply(elm.value);
                    if(!settings.autoclear || result.isComplete){
                        elm.value = result.value;
                    }else{
                        elm.value="";
                    }
                }
            });
        }
    });
})(jQuery);
