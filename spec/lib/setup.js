function importGrammar(g){
    for (var prop in g) {
        if (g.hasOwnProperty(prop))
            window[prop] = g[prop];

    }
}

importGrammar(jasmine.grammar.FeatureStory);
importGrammar(jasmine.grammar.GWT);


$.fn.caret= function(begin, end) {
		var range;

		if (this.length === 0 || this.is(":hidden")) {
			return;
		}

		if (typeof begin == 'number') {
			end = (typeof end === 'number') ? end : begin;
			return this.each(function() {
				if (this.setSelectionRange) {
					this.setSelectionRange(begin, end);
				} else if (this.createTextRange) {
					range = this.createTextRange();
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
				range = document.selection.createRange();
				begin = 0 - range.duplicate().moveStart('character', -100000);
				end = begin + range.text.length;
			}
			return { begin: begin, end: end };
		}
	};
var input;
beforeEach(function(){ input = $("<input />").appendTo("body").focus(); });
afterEach(function(){ input.remove();});
