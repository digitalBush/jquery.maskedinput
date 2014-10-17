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

	scenario("Mask starts with a literal that fits first placeholder",function(){
		given("a mask beginning with a literal",function(){
			input.mask("19").focus();
		});
		waits(20);
		when("blurring",function(){
			input.blur();
		});
		waits(20);
		then("input value should be correct",function(){
			expect(input).toHaveValue('');
		});
	});

	scenario("Mask starts with a literal that fits first placeholder and autoclear set to false",function(){
		given("a mask beginning with a literal",function(){
			input.mask("?19",{autoclear: false}).focus();
		});
		waits(20);
		when("blurring",function(){
			input.blur();
		});
		waits(20);
		then("input value should be correct",function(){
			expect(input).toHaveValue('');
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

	scenario("Mask contains a partial value with autoclear set to false",function(){
		given("the input has a partial value",function(){
			input.val("1");
		});
		given("a mask with two placeholders and autoclear=false",function(){
			input.mask("99", { autoclear: false });
		});
		when("focusing on the input",function(){
			input.focus();
		});
		then("the value should be partially filled out",function(){
			expect(input).toHaveValue("1_");
		});
		then("the input partial value should remain",function(){
			expect(input).toHaveValue("1_");
		});
	});

	scenario("Mask containing optional mask ?",function(){
		given("the input has a partial value",function(){
			input.val("99");
		});
		given("a optional mask on input",function(){
			input.mask("9?9");
		});
		when("focusing input",function(){
			input.focus();
		});
		waits(1);
		then("caret position should be correct",function(){
			var caret=input.caret();
			expect(caret.begin).toEqual(0);
			expect(caret.end).toEqual(2);
		});
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

	scenario("Mask ending in literal",function(){
		given("a mask ending in a literal",function(){
			input.mask("99!");
		});
		when("typing two characters and blurring",function(){
			input.mashKeys("12").blur();
		});
		then("value should remain",function(){
			expect(input).toHaveValue("12!");
		});
	});

	scenario("Empty placeholders remaining with autoclear set to false",function(){
		given("a mask with two placeholders",function(){
			input.mask("99", { autoclear: false });
		});
		when("typing one character and blurring",function(){
			input.caret(0);
			input.mashKeys("1")
			input.blur();
		});
		then("value should remain visible with placeholders",function(){
			expect(input).toHaveValue("1_");
		});
	});

	scenario("Shifts characters left on blur with autoclear false",function(){
		given("a mask with 10 placeholders",function(){
			input.mask("(999) 999-9999", { autoclear: false });
		});
		when("focusing input",function(){
			input.focus();
		});
		waits(20);
		when("typing characters at the end of the mask and blurring",function(){
			input.caret(12);
			input.mashKeys("44").blur();
		});
		then("characters should shift left to beginning of mask",function(){
			expect(input).toHaveValue("(44_) ___-____");
		});
	});
});
