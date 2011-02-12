feature("Escape Key", function() {
	story('User presses escape key after typing in some changes',function(){
		scenario('mask is applied with an existing value',function(){
			given("an input an existing value '6'", function(){
				input
				.val('6');
			});

			given("a mask definition of '9'", function(){
				input
				.mask('9').focus();
			});
			waits(1);
			when("user types something different then hits escape key",function(){
				input.mashKeys(function(keys){keys.type('1',keys.esc)});
			});

			then("value is return to previous value",function(){
				expect(input).toHaveValue('6');
			});
		});
	});
});
