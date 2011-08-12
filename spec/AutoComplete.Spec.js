feature("Autocompletion", function() {
  story("User interacts with an input with 'mmddyyyy' predefined autocomplete settings", function() {
    beforeEach(function() {
      return input.mask("mm/dd/yyyy", {
        placeholder: " ",
        autocomplete: $.mask.autocomplete_predefined["mmddyyyy"]
      });
    });
    scenario("User enters an invalid month", function() {
      given("an empty input", function() {});
      when("entering an invalid month", function() {
        return input.mashKeys("13");
      });
      return then("input should reset to blank", function() {
        return expect(input).toHaveValue("  /  /    ");
      });
    });
    scenario("User enters a single digit followed by slash", function() {
      given("an empty input", function() {});
      when("entering a single digit followed by slash", function() {
        return input.mashKeys("4/");
      });
      return then("input value should have month zero padded", function() {
        return expect(input).toHaveValue("04/  /    ");
      });
    });
    scenario("User enters a valid two digit month", function() {
      given("an empty input", function() {});
      when("entering '09'", function() {
        return input.mashKeys("09");
      });
      return then("input value should advance to day fields", function() {
        return expect(input).toHaveValue("09/  /    ");
      });
    });
    scenario("User enters an invalid day of month", function() {
      given("an input with the month already entered", function() {
        return input.mashKeys("09");
      });
      when("entering '41'", function() {
        return input.mashKeys("41");
      });
      then("input value should reset to blank day of month", function() {
        return expect(input).toHaveValue("09/  /    ");
      });
      when("entering '36'", function() {
        return input.mashKeys("36");
      });
      return then("input value should reset to blank day of month", function() {
        return expect(input).toHaveValue("09/  /    ");
      });
    });
    scenario("User enters single digit day of month, followed by slash", function() {
      given("an input with the month already entered", function() {
        return input.mashKeys("09");
      });
      when("entering '9/'", function() {
        return input.mashKeys("9/");
      });
      return then("input value should zero pad day of month", function() {
        return expect(input).toHaveValue("09/09/    ");
      });
    });
    scenario("User enters a year less than 30, not 19 or 20", function() {
      given("an input with the month and day already entered", function() {
        return input.mashKeys("0909");
      });
      when("entering '18'", function() {
        return input.mashKeys("18");
      });
      return then("input value should assume 2000s and prefix accordingly", function() {
        return expect(input).toHaveValue("09/09/2018");
      });
    });
    scenario("User enters a year greater than 29", function() {
      given("an input with the month and day already entered", function() {
        return input.mashKeys("0909");
      });
      when("entering '64'", function() {
        return input.mashKeys("64");
      });
      return then("input value should assume 1900s and prefix accordingly", function() {
        return expect(input).toHaveValue("09/09/1964");
      });
    });
    scenario("user starts to enter a year beginning with 20", function() {
      given("an input with the month and day already entered", function() {});
      input.mashKeys("0909");
      when("entering '20'", function() {});
      input.mashKeys("20");
      return then("input value should just reflect the '20' that was entered", function() {
        return expect(input).toHaveValue("09/09/20  ");
      });
    });
    return scenario("user starts to enter a year beginning with 19", function() {
      given("an input with the month and day already entered", function() {});
      input.mashKeys("0909");
      when("entering '19'", function() {});
      input.mashKeys("19");
      return then("input value should just reflect the '19' that was entered", function() {
        return expect(input).toHaveValue("09/09/19  ");
      });
    });
  });
  return story("User interacts with an input with 'mmyyyy' predefined autocomplete settings", function() {
    beforeEach(function() {
      return input.mask("mm/yyyy", {
        placeholder: " ",
        autocomplete: $.mask.autocomplete_predefined["mmyyyy"]
      });
    });
    scenario("User enters an invalid month", function() {
      given("an empty input", function() {});
      when("entering an invalid month", function() {
        return input.mashKeys("13");
      });
      return then("input should reset to blank", function() {
        return expect(input).toHaveValue("  /    ");
      });
    });
    scenario("User enters a single digit followed by slash", function() {
      given("an empty input", function() {});
      when("entering a single digit followed by slash", function() {
        return input.mashKeys("4/");
      });
      return then("input value should have month zero padded", function() {
        return expect(input).toHaveValue("04/    ");
      });
    });
    scenario("User enters a valid two digit month", function() {
      given("an empty input", function() {});
      when("entering '09'", function() {
        return input.mashKeys("09");
      });
      return then("input value should advance to year field", function() {
        return expect(input).toHaveValue("09/    ");
      });
    });
    scenario("User enters a year less than 30, not 19 or 20", function() {
      given("an input with the month already entered", function() {
        return input.mashKeys("09");
      });
      when("entering '18'", function() {
        return input.mashKeys("18");
      });
      return then("input value should assume 2000s and prefix accordingly", function() {
        return expect(input).toHaveValue("09/2018");
      });
    });
    scenario("user starts to enter a year beginning with 20", function() {
      given("an input with the month already entered", function() {});
      input.mashKeys("09");
      when("entering '20'", function() {});
      input.mashKeys("20");
      return then("input value should just reflect the '20' that was entered", function() {
        return expect(input).toHaveValue("09/20  ");
      });
    });
    scenario("user starts to enter a year beginning with 19", function() {
      given("an input with the month already entered", function() {});
      input.mashKeys("09");
      when("entering '19'", function() {});
      input.mashKeys("19");
      return then("input value should just reflect the '19' that was entered", function() {
        return expect(input).toHaveValue("09/19  ");
      });
    });
    return scenario("User enters a year greater than 29", function() {
      given("an input with the month already entered", function() {
        return input.mashKeys("09");
      });
      when("entering '64'", function() {
        return input.mashKeys("64");
      });
      return then("input value should assume 1900s and prefix accordingly", function() {
        return expect(input).toHaveValue("09/1964");
      });
    });
  });
});