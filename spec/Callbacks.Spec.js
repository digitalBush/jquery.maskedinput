feature("Getting CallBacks",function(){
	scenario("completed", function(){
		var executed = false;
		
		given("an input with a mask containing a literal", function(){
			input
			.mask("9/9", {
				completed: function() {
					executed = true;
					var t = this;
					then("'this' from callback must be a jQuery object", function() {
						expect(!!t && !!t.jquery && !!t.length).toBe(true);
					});
				}
			});
		});

		when("typing all numbers",function(){
			input.mashKeys("12");
		});
		
		then("completed callback should fire", function() {
			expect(executed).toBe(true);
		});
	});
	
	scenario("afterBlur", function(){
		var executed = false;
		
		given("an input with a mask containing a literal", function(){
			input
			.mask("9/9", {
				afterBlur: function() {
					executed = true;
				}
			});
		});

		when("typing all numbers",function(){
			input.mashKeys("12").blur();
		});
		
		then("completed callback should fire", function() {
			expect(executed).toBe(true);
		});
	});
});