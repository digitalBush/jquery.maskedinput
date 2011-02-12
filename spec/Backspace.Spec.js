feature("Backspace Key", function() {
	story('User presses backspace with cursor to the right of a mask literal',function(){
		scenario('character at cursor matches definition to the left',function(){
			given("an input with a mask definition of '9-99'", function(){
				input
				.mask("9-99")
				.mashKeys("123");
			});

			given("the input has cursor positioned to the right of literal", function(){
				input.caret(2);
			});

			when("hitting the backspace key",function(){
				input.mashKeys(function(keys){keys.type(keys.backspace)});
			});

			then("value should be correct",function(){
				expect(input).toHaveValue('2-3_');
			});

			and("caret position should be correct",function(){
				expect(input.caret().begin).toEqual(0);
			});
		});

		scenario('character at cursor does not match definition to the left',function(){
			given("an input with a mask definition of 'a-99'", function(){
				input
				.mask("a-99")
				.mashKeys("z12");
			});

			given("the input has cursor positioned to the right of literal", function(){
				input.caret(2);
			});

			when("hitting the backspace key",function(){
				input.mashKeys(function(keys){keys.type(keys.backspace)});
			});

			then("value should be correct",function(){
				expect(input).toHaveValue('_-12');
			});

			and("caret position should be correct",function(){
				expect(input.caret().begin).toEqual(0);
			});
		});
	});

	story('User presses backspace with cursor on last character',function(){
		scenario('cursor character matches definition to the left',function(){
			given("an input with a mask definition of '99'", function(){
				input
				.mask("99")
				.mashKeys("12");
			});

			given("the input has cursor positioned on first character", function(){
				input.caret(1);
			});

			when("hitting the backspace key",function(){
				input.mashKeys(function(keys){keys.type(keys.backspace)});
			});

			then("value should be correct",function(){
				expect(input).toHaveValue('2_');
			});

			and("caret position should be correct",function(){
				expect(input.caret().begin).toEqual(0);
			});
		});

		scenario('cursor character does not match definition to the left',function(){
			given("an input with a mask definition of '9a'", function(){
				input
				.mask("9a")
				.mashKeys("1z");
			});

			given("the input has cursor positioned on first character", function(){
				input.caret(1);
			});

			when("hitting the backspace key",function(){
				input.mashKeys(function(keys){keys.type(keys.backspace)});
			});

			then("value should be correct",function(){
				expect(input).toHaveValue('_z');
			});

			and("caret position should be correct",function(){
				expect(input.caret().begin).toEqual(0);
			});
		});

		describe('There is a mask literal between the two placeholders',function(){
			scenario('character at end matches definition of first position',function(){
				given("an input with a mask definition of '9-9'", function(){
					input
					.mask("9-9")
					.mashKeys("12");
				});

				given("the input has cursor positioned on literal", function(){
					input.caret(1);
				});

				when("hitting the backspace key",function(){
					input.mashKeys(function(keys){keys.type(keys.backspace)});
				});

				then("value should be correct",function(){
					expect(input).toHaveValue('2-_');
				});

				and("caret position should be correct",function(){
					expect(input.caret().begin).toEqual(0);
				});
			});

			scenario('character at end does not match definition of first position',function(){
				given("an input with a mask definition of '9-9'", function(){
					input
					.mask("9-a")
					.mashKeys("1z");
				});

				given("the input has cursor positioned on literal", function(){
					input.caret(1);
				});

				when("hitting the backspace key",function(){
					input.mashKeys(function(keys){keys.type(keys.backspace)});
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
