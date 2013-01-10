feature("Focusing A Masked Input",function(){
	scenario("Mask starts with a placeholder",function(){
		given("a mask beginning with a placeholder",function(){
			input.mask("9");
		});
		when("focusing",function(){
			input.focus();
		});
		waits(20);
		then("placeholder text should be correct",function(){
			expect(input).toHaveValue('_');
		});
		and("caret position should be correct",function(){
			var caret=input.caret();
			expect(caret.begin).toEqual(0);
			expect(caret.end).toEqual(0);
		});
	});

	scenario("Mask starts with a literal",function(){
		given("a mask beginning with a literal",function(){
			input.mask("(9)");
		});
		when("focusing",function(){
			input.focus();
		});
		waits(20);
		then("placeholder text should be correct",function(){
			expect(input).toHaveValue('(_)');
		});
		and("caret position should be correct",function(){
			var caret=input.caret();
			expect(caret.begin).toEqual(1);
			expect(caret.end).toEqual(1);
		});
	});

	scenario("Masking a hidden input",function(){
		var error;
		$(window).on("error.test",function(err){error=err;})

		given("a mask on a hidden input",function(){
			input.hide().mask("9");
		});
		when("focusing input",function(){
			input.focus();
		});
		waits(1);
		then("should not throw an error",function(){
			expect(error).toBeUndefined();
		})
	});
});

feature("Leaving A Masked Input",function(){
	scenario("All placeholders filled",function(){
		given("a mask with two placeholders",function(){
			input.mask("99");
		});
		when("typing two characters and blurring",function(){
			input.mashKeys("12").blur();
		});
		then("value should be correct",function(){
			expect(input).toHaveValue("12");
		});
	});

	scenario("Empty placeholders remaining",function(){
		given("a mask with two placeholders",function(){
			input.mask("99");
		});
		when("typing one character and blurring",function(){
			input.mashKeys("1").blur();
		});
		then("value should be empty",function(){
			expect(input).toHaveValue("");
		});
	});
});

feature("Optional marker",function(){
	scenario("Placeholders not filled to marker",function(){
		given("a mask with an optional marker",function(){
			input.mask("99?99");
		});
		when("typing one character and leaving",function(){
			input.mashKeys("1").blur();
		});
		then("value should be empty",function(){
			expect(input).toHaveValue("");
		});
	});

	scenario("Placeholders filled to marker",function(){
		given("a mask with an optional marker",function(){
			input.mask("99?99");
		});
		when("typing two characters and leaving",function(){
			input.mashKeys("12").blur();
		});
		then("value should remain",function(){
			expect(input).toHaveValue("12");
		});
	});
});
