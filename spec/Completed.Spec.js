feature("Completed callback", function() {
	scenario('Completing mask by typing last character',function(){
		var completed=false;
		given("an input with a completed callback", function(){
			input.mask("99",{completed:function(){completed=true;}});
		});

		when("typing left to right",function(){
			input.mashKeys("12");
		});

		then("completed callback should be called",function(){
			expect(completed).toBeTruthy();
		});
		then("value should be correct",function(){
			expect(input).toHaveValue('12');
		});
	});

	scenario('Completing mask by typing first character',function(){
		var completed=false;
		given("an input with a completed callback", function(){
			input.val("12").mask("99",{completed:function(){completed=true;}});
		});

		when("replacing first character value",function(){
			input
			.caret(1)
			.mashKeys(function(keys){keys.type(keys.backspace)})
			.mashKeys("3");
		});

		then("completed callback should be called",function(){
			expect(completed).toBeTruthy();
		});

		then("value should be correct",function(){
			expect(input).toHaveValue('32');
		});
	});

	scenario('Typing last character of incomplete mask',function(){
		var completed=false;
		given("an input with a completed callback", function(){
			input
			.mask("99",{completed:function(){completed=true;}})
			.mashKeys("1")
			.mashKeys(function(keys){keys.type(keys.backspace)});
		});

		when("moving cursor to last position and typing",function(){
			input.caret(1).mashKeys("5");
		});

		then("completed callback should not be called",function(){
			expect(completed).toBeFalsy();
		});

		then("value should be correct",function(){
			expect(input).toHaveValue('_5');
		});

	});

	scenario('Typing last character of required portion of mask containing optional',function(){
		var completed=false;
		given("an input with a completed callback", function(){
			input.mask("99?99",{completed:function(){completed=true;}});
		});

		when("typing left to right",function(){
			input.mashKeys("12");
		});

		then("completed callback should be called",function(){
			expect(completed).toBeTruthy();
		});

		then("value should be correct",function(){
			expect(input).toHaveValue('12__');
		});
	});

	scenario('Typing all characters of required portion of mask containing optional',function(){
		var completedCount=0;
		given("an input with a completed callback", function(){
			input.mask("99?99",{completed:function(){completedCount++;}});
		});

		when("typing left to right",function(){
			input.mashKeys("1234");
		});

		then("completed callback should be called",function(){
			expect(completedCount).toEqual(1);
		});

		then("value should be correct",function(){
			expect(input).toHaveValue('1234');
		});
	});

	scenario('Completing mask by typing last character with literal to right',function(){
		var completed=false;
		given("an input with a completed callback", function(){
			input.mask("99!",{completed:function(){completed=true;}});
		});

		when("typing left to right",function(){
			input.mashKeys("12");
		});

		then("completed callback should be called",function(){
			expect(completed).toBeTruthy();
		});
		then("value should be correct",function(){
			expect(input).toHaveValue('12!');
		});
	});


});
