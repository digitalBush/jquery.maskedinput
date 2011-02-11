feature("Deleting characters", function() {
	scenario('Hitting delete key with cursor on a mask literal',function(){
		given("an input with a mask definition of '9-99'", function(){
			input
			.mask("9-99")
			.mashKeys("123")

		});

		given("the input has cursor positioned on literal", function(){
			input					
			.caret(1);
		});
		when("hitting the delete key",function(){
			input.mashKeys(function(keys){keys.type(keys.delete)});
		});

		then("value should be correct",function(){
			expect(input).toHaveValue('1-3_');
		});

		and("caret position should be correct",function(){
			expect(input.caret().begin).toEqual(2);
		});
	});
});


describe("Delete Specifications", function() {
	describe("when deleting",function(){
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