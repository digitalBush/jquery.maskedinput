feature "Autocompletion", ->
  story "User interacts with an input with 'mmddyyyy' predefined autocomplete settings", ->
    beforeEach ->
      $.mask.definitions["~"] = "[+-]"
      $.mask.definitions["m"] = "[0-9/]"
      $.mask.definitions["d"] = "[0-9/]"
      $.mask.definitions["y"] = "[0-9/]"
      input.mask "mm/dd/yyyy", 
        placeholder: " "
        autocomplete: $.mask.autocomplete_predefined["mmddyyyy"]
    
    scenario "User enters an invalid month", ->
      given "an empty input", ->
      
      when_ "entering an invalid month", ->
        input.mashKeys "13"
      
      then "input should reset to blank", ->
        expect(input).toHaveValue "  /  /    "
    
    scenario "User enters a single digit followed by slash", ->
      given "an empty input", ->
      
      when_ "entering a single digit followed by slash", ->
        input.mashKeys "4/"
      
      then "input value should have month zero padded", ->
        expect(input).toHaveValue "04/  /    "
    
    scenario "User enters a valid two digit month", ->
      given "an empty input", ->
      
      when_ "entering '09'", ->
        input.mashKeys "09"
      
      then "input value should advance to day fields", ->
        expect(input).toHaveValue "09/  /    "
    
    scenario "User enters an invalid day of month", ->
      given "an input with the month already entered", ->
        input.mashKeys "09"
      
      when_ "entering '41'", ->
        input.mashKeys "41"
      
      then "input value should reset to blank day of month", ->
        expect(input).toHaveValue "09/  /    "
      
      when_ "entering '35'", ->
        input.mashKeys "35"
      
      then "input value should reset to blank day of month", ->
        expect(input).toHaveValue "09/  /    "
    
    scenario "User enters single digit day of month, followed by slash", ->
      given "an input with the month already entered", ->
        input.mashKeys "09"
      
      when_ "entering '9/'", ->
        input.mashKeys "9/"
      
      then "input value should zero pad day of month", ->
        expect(input).toHaveValue "09/09/    "
    
    scenario "User enters a year less than 30, not 19 or 20", ->
      given "an input with the month and day already entered", ->
        input.mashKeys "0909"
      
      when_ "entering '18'", ->
        input.mashKeys "18"
      
      then "input value should assume 2000s and prefix accordingly", ->
        expect(input).toHaveValue "09/09/2018"
