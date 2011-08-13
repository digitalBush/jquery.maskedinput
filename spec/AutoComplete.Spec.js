feature("Autocompletion", function() {
  story("User interacts with an input with 'mmddyyyy' predefined autocomplete settings", function() {
    beforeEach(function() {
      return input.mask("mm/dd/yyyy", {
        placeholder: " ",
        autocomplete: $.mask.autocomplete_predefined["mmddyyyy"]
      });
    });
    it("Should reset the input to blank if the user inputs an invalid month", function() {
      input.mashKeys("13");
      return expect(input).toHaveValue("  /  /    ");
    });
    it("Should zero pad a single digit month if followed by a slash", function() {
      input.mashKeys("4/");
      return expect(input).toHaveValue("04/  /    ");
    });
    it("Should advance to the day fields if user enters a valid two digit month", function() {
      input.mashKeys("09");
      return expect(input).toHaveValue("09/  /    ");
    });
    it("Should reset to blank day of month if any invalid day of month is entered", function() {
      input.mashKeys("0941");
      return expect(input).toHaveValue("09/  /    ");
    });
    it("Should zero pad the day of month if a single digit day of month is followed by a slash", function() {
      input.mashKeys("099/");
      return expect(input).toHaveValue("09/09/    ");
    });
    it("Should consider a two digit year less than 30, but not 19 or 20, to be 21st century and prefix with '20'", function() {
      input.mashKeys("090918");
      return expect(input).toHaveValue("09/09/2018");
    });
    it("Should consider a two digit year greater than 29 to be 20th century and prefix with '19'", function() {
      input.mashKeys("090964");
      return expect(input).toHaveValue("09/09/1964");
    });
    it("Should not prefix the year if the first two digits entered are '20'", function() {
      input.mashKeys("090920");
      return expect(input).toHaveValue("09/09/20  ");
    });
    return it("Should not prefix the year if the first two digits entered are '19'", function() {
      input.mashKeys("090919");
      return expect(input).toHaveValue("09/09/19  ");
    });
  });
  return story("User interacts with an input with 'mmyyyy' predefined autocomplete settings", function() {
    beforeEach(function() {
      return input.mask("mm/yyyy", {
        placeholder: " ",
        autocomplete: $.mask.autocomplete_predefined["mmyyyy"]
      });
    });
    it("Should reset the input to blank if the user inputs an invalid month", function() {
      input.mashKeys("13");
      return expect(input).toHaveValue("  /    ");
    });
    it("Should zero pad a single digit month if followed by a slash", function() {
      input.mashKeys("4/");
      return expect(input).toHaveValue("04/    ");
    });
    it("Should advance to the year field if user enters a valid two digit month", function() {
      input.mashKeys("09");
      return expect(input).toHaveValue("09/    ");
    });
    it("Should consider a two digit digit less than 30, but not 19 or 20, to be 21st century and prefix with '20'", function() {
      input.mashKeys("0918");
      return expect(input).toHaveValue("09/2018");
    });
    it("Should consider a two digit year greater than 29 to be 20th century and prefix with '19'", function() {
      input.mashKeys("0964");
      return expect(input).toHaveValue("09/1964");
    });
    it("Should not prefix the year if the first two digits entered are '20'", function() {
      input.mashKeys("0920");
      return expect(input).toHaveValue("09/20  ");
    });
    return it("Should not prefix the year if the first two digits entered are '19'", function() {
      input.mashKeys("0919");
      return expect(input).toHaveValue("09/19  ");
    });
  });
});