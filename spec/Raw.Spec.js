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
	
	
	scenario("Verify if the input has'nt the mask bound through the raw value", function() {
		given("an input without a mask", function() {
			input
			.mask("9/9-9_9").unmask();
		});
		
		then("The raw value should be undefined and no error must occur", function() {
			expect(input.mask()).toBe(undefined);
		});
	});
	
	scenario("Verify if the input has'nt the mask bound and it doesnt exists (should return undefined)", function() {
		then("The raw value should be undefined for an element that does'nt exists", function() {
			expect($().mask()).toBe(undefined);
		});
	});
});