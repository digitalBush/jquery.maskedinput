describe("Backspace Specifications", function() {
	var input;   
	
	beforeEach(function(){
		 input = 
			$("<input />")
			.appendTo("body"); 
	});
	    
    afterEach(function(){
        input.remove();
    });
    
	describe("when backspacing",function(){
		describe("over a literal",function(){
			beforeEach(function(){
				input
				.mask("9-9")
				.mashKeys(function(keys){keys.type('1',keys.backspace);});
			});	
		
			it("should have the correct placeholder text", function(){	
				expect(input).toHaveValue('_-_');           
			});
			
			it("should have the correct caret position", function(){				
				var caret=input.caret();
				expect(caret.begin).toEqual(0);            
				expect(caret.end).toEqual(0);
			});			
		});
	
	
		describe("with character to right of caret which matches mask definition to left",function(){
			beforeEach(function(){
				input
				.mask("99")
				.mashKeys("12")
				.caret(1)
				.mashKeys(function(keys){keys.type(keys.backspace)});
			});	
		
			it("should shift the character to the left", function(){	
				expect(input).toHaveValue('2_');           
			});
			
			it("should have the correct caret position", function(){
				var caret=input.caret();
				expect(caret.begin).toEqual(0);            
				expect(caret.end).toEqual(0);
			});			
		});
	
		describe("with character to right of caret which does not match mask definition to left",function(){
			beforeEach(function(){
				input
				.mask("9a")
				.mashKeys("1z")
				.caret(1)
				.mashKeys(function(keys){keys.type(keys.backspace)});
			});	
		
			it("should not shift the character to the left", function(){	
				expect(input).toHaveValue('_z');           
			});
			
			it("should have the correct caret position", function(){
				var caret=input.caret();
				expect(caret.begin).toEqual(0);            
				expect(caret.end).toEqual(0);
			});			
		});
	});
});