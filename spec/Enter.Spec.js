feature("Enter Key", function() {
    var enterKeyEvent = $.Event('keydown.mask');
    enterKeyEvent.which = enterKeyEvent.keyCode = 13;

    story('User presses enter key after typing in some changes',function(){
        scenario("All placeholders filled",function(){
            given("a mask with two placeholders",function(){
                input.mask("99");
            });
            when("typing two characters and pressing enter",function(){
                input.mashKeys("12").trigger(enterKeyEvent);
            });
            then("value should be correct",function(){
                expect(input).toHaveValue("12");
            });
        });

        scenario("Empty placeholders remaining",function(){
            given("a mask with two placeholders",function(){
                input.mask("99");
            });
            when("typing one character and pressing enter",function(){
                input.mashKeys("1").trigger(enterKeyEvent);
            });
            then("value should be empty",function(){
                expect(input).toHaveValue("");
            });
        });

        scenario("Empty placeholders remaining with autoclear set to false",function(){
            given("a mask with two placeholders",function(){
                input.mask("99", { autoclear: false });
            });
            when("typing one character and pressing enter",function(){
                input.caret(0);
                input.mashKeys("1")
                input.trigger(enterKeyEvent);
            });
            then("value should remain visible with placeholders",function(){
                expect(input).toHaveValue("1_");
            });
        });
    });

    story("User presses enter key after typing in some changes and masks contain Optional Markers",function(){
        scenario("Placeholders not filled to marker",function(){
            given("a mask with an optional marker",function(){
                input.mask("99?99");
            });
            when("typing one character and leaving",function(){
                input.mashKeys("1").trigger(enterKeyEvent);
            });
            then("value should be empty",function(){
                expect(input).toHaveValue("");
            });
        });

        scenario("Placeholders not filled to marker and autoclear = false", function() {
            given("a mask with an optional marker",function(){
                input.mask("99?99", { autoclear: false });
            });
            when("typing one character and leaving",function(){
                input.mashKeys("1").trigger(enterKeyEvent);
            });
            then("value should be empty",function(){
                expect(input).toHaveValue("1___");
            });
        });

        scenario("Placeholders filled to marker",function(){
            given("a mask with an optional marker",function(){
                input.mask("99?99");
            });
            when("typing two characters and leaving",function(){
                input.mashKeys("12").trigger(enterKeyEvent);
            });
            then("value should remain",function(){
                expect(input).toHaveValue("12");
            });
        });

        scenario("Placeholders filled to marker and autoclear = false", function() {
            given("a mask with an optional marker",function(){
                input.mask("99?99", { autoclear: false });
            });
            when("typing two characters and leaving",function(){
                input.mashKeys("12").trigger(enterKeyEvent);
            });
            then("value should remain",function(){
                expect(input).toHaveValue("12");
            });
        });

        scenario("Placeholders filled, one marker filled, and autoclear = false", function() {
            given("a mask with an optional marker",function(){
                input.mask("99?99", { autoclear: false });
            });
            when("typing three characters and leaving",function(){
                input.mashKeys("123").trigger(enterKeyEvent);
            });
            then("value should remain",function(){
                expect(input).toHaveValue("123");
            });
        });

        scenario("Placeholders and markers filled, and autoclear = false", function() {
            given("a mask with an optional marker",function(){
                input.mask("99?99", { autoclear: false });
            });
            when("typing four characters and leaving",function(){
                input.mashKeys("1234").trigger(enterKeyEvent);
            });
            then("value should remain",function(){
                expect(input).toHaveValue("1234");
            });
        });
    });
});
