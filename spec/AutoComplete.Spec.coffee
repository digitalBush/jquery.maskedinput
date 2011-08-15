feature "Autocompletion", ->
  story "User interacts with an input with 'mmddyyyy' predefined autocomplete settings", ->
    beforeEach ->
      input.mask "mm/dd/yyyy", 
        placeholder: " "
        autocomplete: $.mask.autocomplete_predefined["mmddyyyy"]

    it "Should reset the input to blank if the user inputs an invalid month", ->
      input.mashKeys "13"
      expect(input).toHaveValue "  /  /    "

    it "Should reset the input to blank if the user inputs a slash as the first month character", ->
      input.mashKeys "/"
      expect(input).toHaveValue "  /  /    "

    it "Should zero pad a single digit month if followed by a slash", ->
      input.mashKeys "4/"
      expect(input).toHaveValue "04/  /    "

    it "Should advance to the day fields if user enters a valid two digit month", ->
      input.mashKeys "09"
      expect(input).toHaveValue "09/  /    "

    it "Should reset to blank day of month if a slash is entered as the first charactor of day of month", ->
      input.mashKeys "09/"
      expect(input).toHaveValue "09/  /    "

    it "Should reset to blank day of month if any invalid day of month is entered", ->
      input.mashKeys "0941"
      expect(input).toHaveValue "09/  /    "

    it "Should zero pad the day of month if a single digit day of month is followed by a slash", ->
      input.mashKeys "099/"
      expect(input).toHaveValue "09/09/    "

    it "Should consider a two digit year less than 30, but not 19 or 20, to be 21st century and prefix with '20'", ->
      input.mashKeys "090918"
      expect(input).toHaveValue "09/09/2018"

    it "Should consider a two digit year greater than 29 to be 20th century and prefix with '19'", ->
      input.mashKeys "090964"
      expect(input).toHaveValue "09/09/1964"

    it "Should not prefix the year if the first two digits entered are '20'", ->
      input.mashKeys "090920"
      expect(input).toHaveValue "09/09/20  "

    it "Should not prefix the year if the first two digits entered are '19'", ->
      input.mashKeys "090919"
      expect(input).toHaveValue "09/09/19  "

  story "User interacts with an input with 'mmyyyy' predefined autocomplete settings", ->
    beforeEach ->
      input.mask "mm/yyyy", 
        placeholder: " "
        autocomplete: $.mask.autocomplete_predefined["mmyyyy"]

    it "Should reset the input to blank if the user inputs an invalid month", ->
      input.mashKeys "13"
      expect(input).toHaveValue "  /    "

    it "Should reset the input to blank if the user inputs a slash as the first character", ->
      input.mashKeys "/"
      expect(input).toHaveValue "  /    "

    it "Should zero pad a single digit month if followed by a slash", ->
      input.mashKeys "4/"
      expect(input).toHaveValue "04/    "

    it "Should advance to the year field if user enters a valid two digit month", ->
      input.mashKeys "09"
      expect(input).toHaveValue "09/    "

    it "Should consider a two digit digit less than 30, but not 19 or 20, to be 21st century and prefix with '20'", ->
      input.mashKeys "0918"
      expect(input).toHaveValue "09/2018"

    it "Should consider a two digit year greater than 29 to be 20th century and prefix with '19'", ->
      input.mashKeys "0964"
      expect(input).toHaveValue "09/1964"

    it "Should not prefix the year if the first two digits entered are '20'", ->
      input.mashKeys "0920"
      expect(input).toHaveValue "09/20  "

    it "Should not prefix the year if the first two digits entered are '19'", ->
      input.mashKeys "0919"
      expect(input).toHaveValue "09/19  "


