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
				expect(input.val()).toEqual('1-_');           
			});
			
			it("should have the correct caret position", function(){
				waits(1);
				runs(function(){
					var caret=input.caret();
					expect(caret.begin).toEqual(2);            
					expect(caret.end).toEqual(2);
				});
			});
			
			describe("when blurring", function(){
				beforeEach(function(){
					input.blur();
				});
				
				it("should have an empty value", function(){
					expect(input.val()).toEqual('');            
				});
			});
		});
		
		describe("when typing a complete mask",function(){
			beforeEach(function(){
				input.mashKeys('16');
			});				 
		
		
			it("should have the correct placeholder text", function(){	
				expect(input.val()).toEqual('1-6');           
			});
			
			it("should have the correct caret position", function(){
				waits(1);
				runs(function(){
					var caret=input.caret();
					expect(caret.begin).toEqual(3);            
					expect(caret.end).toEqual(3);
				});
			});
			
			describe("when blurring", function(){
				beforeEach(function(){
					input.blur();
				});
				
				it("should have an empty value", function(){
					expect(input.val()).toEqual('1-6');            
				});
			});
		});

	});
	
	
});