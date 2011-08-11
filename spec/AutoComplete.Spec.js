feature("Autocompletion", function() {	
	story("User interacts with an input with 'mmddyyyy' predefined autocomplete settings", function(){
		beforeEach(function(){
			$.mask.definitions['~'] = "[+-]";
			$.mask.definitions['m'] = "[0-9\/]";
			$.mask.definitions['d'] = "[0-9\/]";
			$.mask.definitions['y'] = "[0-9\/]";
			input.mask("mm/dd/yyyy",{ placeholder: " ",
					   autocomplete: $.mask.autocomplete_predefined['mmddyyyy']
			});
		});
		
		scenario('User enters an invalid month',function(){
			given("an empty input", function(){
			});

			when("entering an invalid month",function(){
				input.mashKeys("13");
			});

			then("input should reset to blank",function(){
				expect(input).toHaveValue('  /  /    ');
			});
		});
		
		scenario('User enters a single digit followed by slash',function(){
			given("an empty input", function(){
			});

			when("entering a single digit followed by slash",function(){
				input.mashKeys("4/");
			});

			then("input value should have month zero padded",function(){
				expect(input).toHaveValue('04/  /    ');
			});
		});
		
		scenario('User enters a valid two digit month',function(){
			given("an empty input", function(){
			});

			when("entering '09'",function(){
				input.mashKeys("09");
			});

			then("input value should advance to day fields",function(){
				expect(input).toHaveValue('09/  /    ');
			});
		});
		
		scenario('User enters an invalid day of month',function(){
			given("an input with the month already entered", function(){
				input.mashKeys("09");
			});

			when("entering '41'",function(){
				input.mashKeys("41");
			});

			then("input value should reset to blank day of month",function(){
				expect(input).toHaveValue('09/  /    ');
			});
			
			when("entering '35'",function(){
				input.mashKeys("35");
			});

			then("input value should reset to blank day of month",function(){
				expect(input).toHaveValue('09/  /    ');
			});
		});
		
		scenario('User enters single digit day of month, followed by slash',function(){
			given("an input with the month already entered", function(){
				input.mashKeys("09");
			});

			when("entering '9/'",function(){
				input.mashKeys("9/");
			});

			then("input value should zero pad day of month",function(){
				expect(input).toHaveValue('09/09/    ');
			});
		});
	});
});

