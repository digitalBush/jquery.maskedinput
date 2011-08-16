(function() {
  feature("Progressive Reveal", function() {
    return story("User interacts with an input with 'mmddyyyy' predefined autocomplete settings and 'progressive_reveal' set to true", function() {
      beforeEach(function() {
        return input.mask("mm/dd/yyyy", {
          placeholder: " ",
          autocomplete: $.mask.autocomplete_predefined["mmddyyyy"],
          progressive_reveal: true
        });
      });
      scenario("User hasn't entered anything yet", function() {
        given("An empty input", function() {
          return null;
        });
        whilst("User does nothing", function() {
          return null;
        });
        return hence("Input is blank", function() {
          return (expect(input)).toHaveValue('');
        });
      });
      scenario("User enters two digit month", function() {
        given("An empty input", function() {
          return null;
        });
        whilst("User enters valid month", function() {
          return input.mashKeys("11");
        });
        return hence("Input advances to the day of month field", function() {
          (expect(input)).toHaveValue("11/");
          return (expect(input.caret().begin)).toEqual(3);
        });
      });
      return scenario("User enters two digit month, then backspace", function() {
        given("An empty input", function() {
          return null;
        });
        whilst("User enters valid month", function() {
          return input.mashKeys("11");
        });
        likewise("User hits backspace", function() {
          return input.mashKeys(function(keys) {
            return keys.type(keys.backspace);
          });
        });
        hence("Input deletes slash and second digit of month", function() {
          return (expect(input)).toHaveValue("1");
        });
        return likewise("The cursor is positioned after the first digit of month", function() {
          return (expect(input.caret().begin)).toEqual(1);
        });
      });
    });
  });
}).call(this);
