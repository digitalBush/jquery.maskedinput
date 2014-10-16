feature("Optional marker",function(){
    scenario("Placeholders not filled to marker",function(){
        given("a mask with an optional marker",function(){
            input.mask("99?99");
        });
        when("typing one character and leaving",function(){
            input.mashKeys("1").blur();
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
            input.mashKeys("1").blur();
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
            input.mashKeys("12").blur();
        });
        then("value should remain",function(){
            expect(input).toHaveValue("12");
        });
    });

    scenario("Placeholders filled to marker with literals after",function(){
        given("a mask with an optional marker and literals",function(){
            input.mask("99!? x 99");
        });
        when("typing two characters and leaving",function(){
            input.mashKeys("12").blur();
        });
        then("value should remain",function(){
            expect(input).toHaveValue("12!");
        });
    });

    scenario("Placeholders filled to marker and autoclear = false", function() {
        given("a mask with an optional marker",function(){
            input.mask("99?99", { autoclear: false });
        });
        when("typing two characters and leaving",function(){
            input.mashKeys("12").blur();
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
            input.mashKeys("123").blur();
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
            input.mashKeys("1234").blur();
        });
        then("value should remain",function(){
            expect(input).toHaveValue("1234");
        });
    });
});
