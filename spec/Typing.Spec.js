describe("Typing Specifications", function() {

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