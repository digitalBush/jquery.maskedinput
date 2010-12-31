describe("Delete Specifications", function() {
	var input;   
	
	beforeEach(function(){
		 input = 
			$("<input />")
			.appendTo("body"); 
	});
	    
    afterEach(function(){
        input.remove();
    });
    
	describe("when deleting",function(){
		describe("with cursor is on a literal",function(){
			beforeEach(function(){
				runs(function(){
					input
					.mask("9-99")	
					.focus();
				});
				waits(1);
				runs(function(){
					input
					.mashKeys("123")
					.caret(1)
					.mashKeys(function(keys){keys.type(keys.delete)});
				});
			});	
		
			it("should have the correct placeholder text", function(){	
				expect(input).toHaveValue('1-3_');           
			});
			
			it("should have the correct caret position", function(){				
				var caret=input.caret();
				expect(caret.begin).toEqual(2);            
				expect(caret.end).toEqual(2);
			});			
		});
	
	
		describe("with character to right of current position which matches current mask definition",function(){
			beforeEach(function(){
				input
				.mask("99")
				.mashKeys("12")
				.caret(0)
				.mashKeys(function(keys){keys.type(keys.delete)});
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
	
		describe("with character to right of current position which not match current mask definition",function(){
			beforeEach(function(){
				input
				.mask("9a")
				.mashKeys("1z")
				.caret(0)
				.mashKeys(function(keys){keys.type(keys.delete)});
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