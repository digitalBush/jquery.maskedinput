feature("Readonly Inputs", function() {
	scenario('Typing',function(){

		given("a input with readonly added after mask", function(){
			input.mask("99").attr("readonly",true);
		});

		when("typing left to right",function(){
			input.mashKeys("12");
		});

		then("Input should be ignored",function(){
			expect(input).toHaveValue("");
		});
	});
});
