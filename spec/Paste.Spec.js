feature("Pasting", function() {	
	scenario('When pasting a value',function(){
		var completed=false;
		given("an input with a completed callback", function(){
			input.mask("99",{completed:function(){completed=true;}});
		});

		when("pasting",function(){
			input.val("99").trigger("paste").trigger("input");
		});
		waits(1);
		then("completed callback should be called",function(){
			expect(completed).toBeTruthy();
		});
	});
	
	scenario('When pasting a value with optional mask',function(){
		var completed=false;
		given("an input that contains a '?' character with a completed callback", function(){
			input.mask("99?99",{completed:function(){completed=true;}});
		});

		when("pasting",function(){
			input.val("99").trigger("paste").trigger("input");
		});
		waits(1);
		then("completed callback should be called",function(){
			expect(completed).toBeTruthy();
		});
	});
});