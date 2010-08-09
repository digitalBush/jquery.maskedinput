QUnit.specify("Masked Input", function(){
    
    describe("With a simple mask", function(){
        
        var input;
        
        before(function(){
            input = 
			$("<input />")
			.appendTo("#sandbox")
			.mask("9");                 
        });
        
        after(function(){
            input.remove();
        });
        describe("when focused", function(){
			before(function(){
				input.focus();
			});
			
			it("should have the correct placeholder text", function(){				
				assert(input.val()).equals('_');            
			});
			
			it("should have the correct caret position", function(){				
				wait(1,function(){
					var caret=input.caret();
					assert(caret.begin).equals(0);            
					assert(caret.end).equals(0);            
				});
			});
		});
		
		describe("when blurred", function(){
			before(function(){
				input.blur();
			});
			
			it("should show no value when out of focus", function(){
				
				assert(input.val()).equals('');            
			});
		});

		describe("when typing a full mask", function(){
			before(function(){
				input.focus().autotype("3");
			});
			
			it("should have the correct value", function(){				
				assert(input.val()).equals('3');            
			});
		});
		
    });
    
});
