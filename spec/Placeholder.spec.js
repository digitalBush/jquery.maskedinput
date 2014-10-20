feature("Multiple character placeholders",function(){
    scenario("Focusing",function(){
        given("a mask beginning with multi character placeholder",function(){
            input.mask("99/9999",{placeholder:"mm/yyyy"});
        });
        when("focusing",function(){
            input.focus();
        });
        waits(20);
        then("placeholder text should be correct",function(){
            expect(input).toHaveValue('mm/yyyy');
        });
    });

    scenario("Typing",function(){
        given("a mask beginning with multi character placeholder",function(){
            input.mask("99/9999",{placeholder:"mm/yyyy"});
        });
        when("typing",function(){
            input.mashKeys("12");
        });
        waits(20);
        then("placeholder text should be correct",function(){
            expect(input).toHaveValue('12/yyyy');
        });
    });
});
