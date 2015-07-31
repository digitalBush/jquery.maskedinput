feature("Escaping a character in a mask",function(){
	scenario("Escape a 9",function(){
		given("a mask with an escaped 9 value",function(){
			input.mask("9^999");
		});
		when("focusing",function(){
			input.focus();
		});
		waits(20);
		then("the value should be _9__",function(){
			expect(input).toHaveValue("_9__");
		});
	});

	scenario("Escape a *",function(){
		given("a mask with an escaped * value",function(){
			input.mask("*^***");
		});
		when("focusing",function(){
			input.focus();
		});
		waits(20);
		then("the value should be _*__",function(){
			expect(input).toHaveValue("_*__");
		});
	});

	scenario("Escape an a",function(){
		given("a mask with an escaped a value",function(){
			input.mask("a^aaa");
		});
		when("focusing",function(){
			input.focus();
		});
		waits(20);
		then("the value should be _a__",function(){
			expect(input).toHaveValue("_a__");
		});
	});

	scenario("Escape a ?",function(){
		given("a mask with an escaped ? value",function(){
			input.mask("a^?aa");
		});
		when("focusing",function(){
			input.focus();
		});
		waits(20);
		then("the value should be _?__",function(){
			expect(input).toHaveValue("_?__");
		});
	});

	scenario("Escape a ?, show that it is ignored as an optional now with autoclear false",function(){
		given("a mask with an escaped ? value",function(){
			input.mask("a^?aa", { autoclear: false });
		});
		when("typing one character and blurring",function(){
			input.mashKeys("m").blur();
		});
		then("the value should be _?__",function(){
			expect(input).toHaveValue("m?__");
		});
	});

	scenario("Escape the escape character ^",function(){
		given("a mask with an escaped ^ value",function(){
			input.mask("a^^aa");
		});
		when("focusing",function(){
			input.focus();
		});
		waits(20);
		then("the value should be _^__",function(){
			expect(input).toHaveValue("_^__");
		});
	});
});