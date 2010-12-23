beforeEach(function(){
	this.addMatchers({
		toHaveValue:function(expected){			
			return (this.actual=this.actual.val())===expected;
		},
		toMatchPropertiesOf:function(expected){
			if($.type(expected)!=='object')
				return false;
			for(var prop in expected){
				if(this.actual[prop]!==expected[prop])
					return false;
			}
			return true;
		}
	});
});
