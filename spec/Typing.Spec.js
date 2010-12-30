describe("Typing Specifications", function() {
	var input;   
	
	beforeEach(function(){
		 input = 
			$("<input />")
			.appendTo("body"); 
	});
	    
    afterEach(function(){
        input.remove();
    });
    
    describe("with a mask containing a literal", function(){
		beforeEach(function(){
			 runs(function(){
			 	input
			 	.mask("9-9")
			 	.focus();				 
			 });
			 waits(1);		 
		});
			
		describe("when typing an incomplete mask",function(){
			beforeEach(function(){
				input.mashKeys('1');
			});		
		
			it("should have the correct placeholder text", function(){	
				expect(input).toHaveValue('1-_');           
			});
			
			it("should have the correct caret position", function(){
				var caret=input.caret();
				expect(caret.begin).toEqual(2);            
				expect(caret.end).toEqual(2);
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
		
		describe("when typing a complete mask",function(){
			beforeEach(function(){
				input.mashKeys('16');
			});	
		
			it("should have the correct placeholder text", function(){	
				expect(input).toHaveValue('1-6');           
			});
			
			it("should have the correct caret position", function(){
				var caret=input.caret();
				expect(caret.begin).toEqual(3);            
				expect(caret.end).toEqual(3);
			});
			
			describe("when blurring", function(){
				beforeEach(function(){
					input.blur();
				});
				
				it("should retain the value", function(){
					expect(input).toHaveValue('1-6');            
				});
			});
		});		
	});

	describe("with caret position to the left of a character",function(){
		describe("when character to right matches the next mask definition",function(){
			beforeEach(function(){
				runs(function(){
					input
					.mask("99")
					.focus()						
				});
				waits(1);
				runs(function(){
					input
					.mashKeys("1")
					.caret(0)
					.mashKeys("2");
				});
			})
			
			it("should shift character to the right",function(){
				expect(input).toHaveValue("21");
			});
			
			it("should have correct caret position",function(){
				var caret=input.caret();
				expect(caret.begin).toEqual(1);            
				expect(caret.end).toEqual(1);
			});
		});
		
		describe("when character to right does not match the next mask definition",function(){
			beforeEach(function(){
				runs(function(){
					input
					.mask("9a")
					.focus()						
				});
				waits(1);
				runs(function(){
					input
					.mashKeys("1")
					.caret(0)
					.mashKeys("2");
				});
			})
			
			it("should overwrite character",function(){
				expect(input).toHaveValue("2_");
			});
			
			it("should have correct caret position",function(){
				var caret=input.caret();
				expect(caret.begin).toEqual(1);            
				expect(caret.end).toEqual(1);
			});
		});		
	});
});