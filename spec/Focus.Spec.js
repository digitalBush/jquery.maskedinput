describe("Focus Specifications", function() {
	var input;   
	
	beforeEach(function(){
		 input = 
			$("<input />")
			.appendTo("body"); 
	});
	    
    afterEach(function(){
        input.remove();
    });
    
    describe("when focusing with a mask that starts with a placeholder", function(){
			beforeEach(function(){
				 input.mask("9").focus(); 
			});
			
			it("should have the correct placeholder text", function(){	
				expect(input).toHaveValue('_');           
			});
			
			it("should have the correct caret position", function(){
				waits(1);
				runs(function(){
					var caret=input.caret();
					expect(caret.begin).toEqual(0);            
					expect(caret.end).toEqual(0);
				});
			});
			
			describe("when blurring", function(){
				beforeEach(function(){
					input.blur();
				});
				
				it("should have an empty value", function(){
					expect(input).toHaveValue('');            
				});
			});
	});
	
	describe("when focusing with a mask that starts with a literal", function(){
			beforeEach(function(){
				 input.mask("(9)").focus(); 
			});
			
			it("should have the correct placeholder text", function(){	
				expect(input).toHaveValue('(_)');           
			});
			
			it("should have the correct caret position", function(){
				waits(1);
				runs(function(){
					var caret=input.caret();
					expect(caret.begin).toEqual(1);            
					expect(caret.end).toEqual(1);
				});
			});
			
			describe("when blurring", function(){
				beforeEach(function(){
					input.blur();
				});
				
				it("should have an empty value", function(){
					expect(input).toHaveValue('');            
				});
			});
	});
});