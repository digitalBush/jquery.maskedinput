feature("IE8 bugs", function() {

	var enterKeyEvent = $.Event('keydown.mask');
	enterKeyEvent.which = enterKeyEvent.keyCode = 13;

	var textarea;
    afterEach(function() {
        if (!textarea) return;
        textarea.remove();
        textarea=null;
    });

    story('User tries enter value into masked TEXTAREA',function(){

    	scenario("Using INPUT",function(){
            given("a mask 9999",function(){
            	input.mask("9999");
            });
            when("typing 1234",function(){
            	input.mashKeys("1234").trigger(enterKeyEvent);;
            });
            then("value should be correct",function(){
                expect(input).toHaveValue("1234");
            });
        });

    	scenario("Using TEXTAREA",function(){
            given("a mask 9999",function(){
            	textarea = $("<textarea/>").appendTo("body").focus();
            	textarea.mask("9999");
            });
            when("typing 1234",function(){
            	textarea.mashKeys("1234").trigger(enterKeyEvent);
            });
            then("value should be correct",function(){
                expect(textarea).toHaveValue("1234");
            });
        });

    });

});
