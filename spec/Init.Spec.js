feature("Initializing a Mask",function(){
	scenario("An input with no value",function(){
		given("an input with no value",function(){
			input.val("");
		});
		when("setting a mask with two placeholders",function(){
			input.mask("99");
		});
		then("the value should be an empty string",function(){
			expect(input).toHaveValue("");
		});
	});

	scenario("An input with a valid value and no placeholders remaining",function(){
		given("an input with a valid value",function(){
			input.val("5555555555");
		});
		when("setting a mask",function(){
			input.mask("(999) 999-9999");
		});
		then("the value should be intact",function(){
			expect(input).toHaveValue("(555) 555-5555");
		});
	});

	scenario("An input with an invalid value and placeholders remaining",function(){
		given("an invalid input value",function(){
			input.val("55555555");
		});
		when("setting a mask",function(){
			input.mask("(999) 999-9999");
		});
		then("the value should be empty",function(){
			expect(input).toHaveValue("");
		});
	});

	scenario("An input with an invalid value, placeholders remaining and autoclear set to false",function(){
		given("an invalid input value",function(){
			input.val("55555555");
		});
		when("setting a mask with autoclear set to false",function(){
			input.mask("(999) 999-9999", { autoclear: false });
		});
		then("the value be intact with placeholders visible",function(){
			expect(input).toHaveValue("(555) 555-55__");
		});
	});

	scenario("An input no value and autoclear set to false", function() {
		given("an input with no value",function(){
			input.val("");
		});
		when("setting a mask with autoclear set to false",function(){
			input.mask("(999) 999-9999", { autoclear: false });
		});
		then("the value should be empty",function(){
			expect(input).toHaveValue("");
		});
	});
});
