feature("Masking an Input", function() {	
	scenario('Applying a mask to an already masked input',function(){
		given("an input with two masks", function(){
			input
			.mask("9")
			.mask("99");
		});

		when("typing a number",function(){
			input.mashKeys("1");
		});

		then("value should be correct",function(){
			expect(input).toHaveValue('1_');
		});
	});
});

