var container;
feature("AutoMask", function() {
	beforeEach(function() {
		container = $("<div id='auto-mask-container'><input type='text' data-mask='9/9' /></div><div id='no-auto-mask'><input type='text' data-mask='9/9' /></div>").appendTo("body");
	});
	
	scenario("Valid container", function() {
		var $cont = $("#auto-mask-container");
		var $input = $cont.find("input");
		
		given("an autoMask", function() {
			$cont.autoMask();
		});
		
		when("typing and bluring", function() {
			$input.focus().mashKeys("12").blur();
		});
		
		then("The mask should be correct", function() {
			expect($input).toHaveValue("1/2");
		});
		
	});
	
	scenario("Invalid container", function() {
		var $cont = $("#no-auto-mask");
		var $input = $cont.find("input");
		
		when("typing and bluring", function() {
			$input.focus().mashKeys("12").blur();
		});
		
		then("The mask should be correct", function() {
			expect($input).toHaveValue("12");
		});
	});
	
	afterEach(function() {
		container.remove();
		container = undefined;
	});
});