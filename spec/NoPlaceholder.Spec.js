feature("No placeholder defined",function(){
    scenario("Focusing",function(){
        given("a mask with delimiters but an empty placeholder",function(){
            input.mask("99-9999999",{placeholder:""});
        });
        when("focusing",function(){
            input.focus();
        });
        waits(20);
        then("No mask delimiters are shown until necessary",function(){
            expect(input).toHaveValue('');
        });
    });

    scenario("Typing",function(){
        given("a mask with delimiters, empty placeholder",function(){
            input.mask("99-9999999",{placeholder:""});
        });
        when("typing",function(){
            input.mashKeys("1");
        });
        waits(20);
        then("delimiter should not display until necessary",function(){
            expect(input).toHaveValue('1');
        });
    });

    scenario("Typing",function(){
        given("a mask with delimiters, empty placeholder",function(){
            input.mask("99-9999999",{placeholder:""});
        });
        when("typing",function(){
            input.mashKeys("12");
        });
        waits(20);
        then("delimiter should display when necessary",function(){
            expect(input).toHaveValue('12-');
        });
    });

    scenario("Focusing",function(){
        given("a mask with starting delimiter but an empty placeholder",function(){
            input.mask("(999) 999-9999",{placeholder:""});
        });
        when("focusing",function(){
            input.focus();
        });
        waits(20);
        then("Only first delimiter character shown",function(){
            expect(input).toHaveValue('(');
        });
    });

    scenario("Typing",function(){
        given("a mask with delimiters, empty placeholder",function(){
            input.mask("(999) 999-9999",{placeholder:""});
        });
        when("typing",function(){
            input.mashKeys("617868");
        });
        waits(20);
        then("delimiter should not display until necessary",function(){
            expect(input).toHaveValue('(617) 868-');
        });
    });

});
