feature("Delete Key", function() {
	story('User presses delete with cursor on a mask literal',function(){
		scenario('character at end matches definition to the right',function(){
			given("an input with a mask definition of '9-99'", function(){
				input
				.mask("9-99")
				.mashKeys("123");
			});

			given("the input has cursor positioned on literal", function(){
				input.caret(1);
			});

			when("hitting the delete key",function(){
				input.mashKeys(function(keys){keys.type(keys.delete)});
			});

			then("value should be correct",function(){
				expect(input).toHaveValue('1-3_');
			});

			and("caret position should be correct",function(){
				expect(input.caret().begin).toEqual(2);
			});
		});

		scenario('character at end does not match definition to the right',function(){
			given("an input with a mask definition of '9-9a'", function(){
				input
				.mask("9-9a")
				.mashKeys("12z");
			});

			given("the input has cursor positioned on literal", function(){
				input.caret(1);
			});

			when("hitting the delete key",function(){
				input.mashKeys(function(keys){keys.type(keys.delete)});
			});

			then("value should be correct",function(){
				expect(input).toHaveValue('1-_z');
			});

			and("caret position should be correct",function(){
				expect(input.caret().begin).toEqual(2);
			});
		});
	});

	story('User presses delete with cursor on first character',function(){
		scenario('character to right matches definition of current position',function(){
			given("an input with a mask definition of '99'", function(){
				input
				.mask("99")
				.mashKeys("12");
			});

			given("the input has cursor positioned on first character", function(){
				input.caret(0);
			});

			when("hitting the delete key",function(){
				input.mashKeys(function(keys){keys.type(keys.delete)});
			});

			then("value should be correct",function(){
				expect(input).toHaveValue('2_');
			});

			and("caret position should be correct",function(){
				expect(input.caret().begin).toEqual(0);
			});
		});

		scenario('character to right does not match definition of current position',function(){
			given("an input with a mask definition of '9a'", function(){
				input
				.mask("9a")
				.mashKeys("1z");
			});

			given("the input has cursor positioned on first character", function(){
				input.caret(0);
			});

			when("hitting the delete key",function(){
				input.mashKeys(function(keys){keys.type(keys.delete)});
			});

			then("value should be correct",function(){
				expect(input).toHaveValue('_z');
			});

			and("caret position should be correct",function(){
				expect(input.caret().begin).toEqual(0);
			});
		});
		
		describe('There is a mask literal between the two placeholders',function(){
			scenario('character to right matches definition of current position',function(){
				given("an input with a mask definition of '9-9'", function(){
					input
					.mask("9-9")
					.mashKeys("12");
				});

				given("the input has cursor positioned on first character", function(){
					input.caret(0);
				});

				when("hitting the delete key",function(){
					input.mashKeys(function(keys){keys.type(keys.delete)});
				});

				then("value should be correct",function(){
					expect(input).toHaveValue('2-_');
				});

				and("caret position should be correct",function(){
					expect(input.caret().begin).toEqual(0);
				});
			});

			scenario('character to right does not match definition of current position',function(){
				given("an input with a mask definition of '9-9'", function(){
					input
					.mask("9-a")
					.mashKeys("1z");
				});

				given("the input has cursor positioned on first character", function(){
					input.caret(0);
				});

				when("hitting the delete key",function(){
					input.mashKeys(function(keys){keys.type(keys.delete)});
				});

				then("value should be correct",function(){
					expect(input).toHaveValue('_-z');
				});

				and("caret position should be correct",function(){
					expect(input.caret().begin).toEqual(0);
				});
			});
		});
	});
});
