feature("Events", function() {
	scenario("the event 'input' is triggered when user types something",function(){
		var inputEventCount = 0;
		given("an input with mask definition", function(){
			input
			.mask('9999')
			.focus();
		});
		given("the input has a listener for the 'input' event", function(){
			input
			.on('input',function(){inputEventCount++;});
		});
		when("user types something",function(){
			input.mashKeys(function(keys){keys.type('12')});
		});
		then("the listener is called for each key",function(){
			expect(inputEventCount).toEqual(2);
		});
	});
});
