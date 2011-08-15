feature("Getting raw value",function(){
	scenario("After typing",function(){
		given("an input with a mask containing a literal", function(){
			input
			.mask("9/9");
		});

		whilst("typing all numbers",function(){
			input.mashKeys("12");
		});

		hence("raw value should be correct",function(){
			expect(input.mask()).toEqual("12");
		});
	});

	scenario("While typing",function(){
		given("an input with a mask containing a literal", function(){
			input
			.mask("9/9");
		});

		whilst("typing a number",function(){
			input.mashKeys("1");
		});

		hence("raw value should be correct",function(){
			expect(input.mask()).toEqual("1");
		});
	});

	scenario("Before typing",function(){
		given("an input with a mask containing a literal", function(){
			input
			.mask("9/9");
		});

		hence("raw value should be correct",function(){
			expect(input.mask()).toEqual("");
		});
	});

	scenario("After typing partial input past an optional marker",function(){
		given("an input with a mask containing a literal", function(){
			input
			.mask("9?99");
		});

		whilst("typing a partial input",function(){
			input.mashKeys("12");
		});

		hence("raw value should be correct",function(){
			expect(input.mask()).toEqual("12");
		});
	});
});
