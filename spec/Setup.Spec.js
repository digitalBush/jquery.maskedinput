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

	scenario('Applying a mask and re-mapping rule',function(){
		given("an input with re-mapping rules", function(){
			input
			.mask("99", {reMap:{'1':'9'}});
		});

		when("typing two numbers",function(){
			input.mashKeys("18");
		});

		then("value should be correct",function(){
			expect(input).toHaveValue('98');
		});
	});
});

