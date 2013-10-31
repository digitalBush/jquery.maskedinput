feature("Getting raw value",function(){
	scenario("After typing",function(){
		given("an input with a mask containing a literal", function(){
			input
			.mask("9/9");
		});

		when("typing all numbers",function(){
			input.mashKeys("12");
		});

		then("raw value should be correct",function(){
			expect(input.mask()).toEqual("12");
		});
	});

	scenario("While typing",function(){
		given("an input with a mask containing a literal", function(){
			input
			.mask("9/9");
		});

		when("typing a number",function(){
			input.mashKeys("1");
		});

		then("raw value should be correct",function(){
			expect(input.mask()).toEqual("1");
		});
	});

	scenario("Before typing",function(){
		given("an input with a mask containing a literal", function(){
			input
			.mask("9/9");
		});

		then("raw value should be correct",function(){
			expect(input.mask()).toEqual("");
		});
	});

	scenario("After typing partial input past an optional marker",function(){
		given("an input with a mask containing a literal", function(){
			input
			.mask("9?99");
		});

		when("typing a partial input",function(){
			input.mashKeys("12");
		});

		then("raw value should be correct",function(){
			expect(input.mask()).toEqual("12");
		});
	});
});

feature("Getting raw value with autoclear set to false", function() {
	scenario("After typing",function(){
		given("an input with a mask containing a literal", function(){
			input.mask("9/9", { autoclear: false });
		});

		when("typing all numbers",function(){
			input.mashKeys("12");
		});

		then("raw value should be correct",function(){
			expect(input.mask()).toEqual("12");
		});
	});

	scenario("While typing",function(){
		given("an input with a mask containing a literal", function(){
			input.mask("9/9", { autoclear: false });
		});

		when("typing a number",function(){
			input.mashKeys("1");
		});

		then("raw value should be correct",function(){
			expect(input.mask()).toEqual("1");
		});
	});

	scenario("Before typing",function(){
		given("an input with a mask containing a literal", function(){
			input.mask("9/9", { autoclear: false });
		});

		then("raw value should be correct",function(){
			expect(input.mask()).toEqual("");
		});
	});

	scenario("After typing partial input past an optional marker",function(){
		given("an input with a mask containing a literal", function(){
			input.mask("9?99", { autoclear: false });
		});

		when("typing a partial input",function(){
			input.mashKeys("12");
		});

		then("raw value should be correct",function(){
			expect(input.mask()).toEqual("12");
		});
	});

	scenario("After typing partial input",function(){
		given("an input with a mask containing a literal", function(){
			input.mask("99?99", { autoclear: false });
		});

		when("typing a partial input",function(){
			input.mashKeys("1");
		});

		then("raw value should be correct",function(){
			expect(input.mask()).toEqual("1");
		});
	});

	scenario("After typing partial input up to an optional marker",function(){
		given("an input with a mask containing a literal", function(){
			input.mask("9?99", { autoclear: false });
		});

		when("typing a partial input",function(){
			input.mashKeys("1");
		});

		then("raw value should be correct",function(){
			expect(input.mask()).toEqual("1");
		});
	});
});