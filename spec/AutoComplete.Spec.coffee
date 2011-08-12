feature "Autocompletion", ->
  story "User interacts with an input with 'mmddyyyy' predefined autocomplete settings", ->
    beforeEach ->
      input.mask "mm/dd/yyyy", 
        placeholder: " "
        autocomplete: $.mask.autocomplete_predefined["mmddyyyy"]
    
    scenario "User enters an invalid month", ->
      given "an empty input", ->
      
      when_ "entering an invalid month", ->
        input.mashKeys "13"
      
      then_ "input should reset to blank", ->
        expect(input).toHaveValue "  /  /    "
    
    scenario "User enters a single digit followed by slash", ->
      given "an empty input", ->
      
      when_ "entering a single digit followed by slash", ->
        input.mashKeys "4/"
      
      then_ "input value should have month zero padded", ->
        expect(input).toHaveValue "04/  /    "
    
    scenario "User enters a valid two digit month", ->
      given "an empty input", ->
      
      when_ "entering '09'", ->
        input.mashKeys "09"
      
      then_ "input value should advance to day fields", ->
        expect(input).toHaveValue "09/  /    "
    
    scenario "User enters an invalid day of month", ->
      given "an input with the month already entered", ->
        input.mashKeys "09"
      
      when_ "entering '41'", ->
        input.mashKeys "41"
      
      then_ "input value should reset to blank day of month", ->
        expect(input).toHaveValue "09/  /    "
      
      when_ "entering '36'", ->
        input.mashKeys "36"
      
      then_ "input value should reset to blank day of month", ->
        expect(input).toHaveValue "09/  /    "
    
    scenario "User enters single digit day of month, followed by slash", ->
      given "an input with the month already entered", ->
        input.mashKeys "09"
      
      when_ "entering '9/'", ->
        input.mashKeys "9/"
      
      then_ "input value should zero pad day of month", ->
        expect(input).toHaveValue "09/09/    "
    
    scenario "User enters a year less than 30, not 19 or 20", ->
      given "an input with the month and day already entered", ->
        input.mashKeys "0909"
      
      when_ "entering '18'", ->
        input.mashKeys "18"
      
      then_ "input value should assume 2000s and prefix accordingly", ->
        expect(input).toHaveValue "09/09/2018"

    scenario "User enters a year greater than 29", ->
      given "an input with the month and day already entered", ->
        input.mashKeys "0909"
      
      when_ "entering '64'", ->
        input.mashKeys "64"
      
      then_ "input value should assume 1900s and prefix accordingly", ->
        expect(input).toHaveValue "09/09/1964"

    scenario "user starts to enter a year beginning with 20", ->
        given "an input with the month and day already entered", ->
        input.mashKeys "0909"

        when_ "entering '20'", ->
        input.mashKeys "20"

        then_ "input value should just reflect the '20' that was entered", ->
            expect(input).toHaveValue "09/09/20  "

    scenario "user starts to enter a year beginning with 19", ->
        given "an input with the month and day already entered", ->
        input.mashKeys "0909"

        when_ "entering '19'", ->
        input.mashKeys "19"

        then_ "input value should just reflect the '19' that was entered", ->
            expect(input).toHaveValue "09/09/19  "
  
  story "User interacts with an input with 'mmyyyy' predefined autocomplete settings", ->
    beforeEach ->
      input.mask "mm/yyyy", 
        placeholder: " "
        autocomplete: $.mask.autocomplete_predefined["mmyyyy"]
    
    scenario "User enters an invalid month", ->
      given "an empty input", ->
      
      when_ "entering an invalid month", ->
        input.mashKeys "13"
      
      then_ "input should reset to blank", ->
        expect(input).toHaveValue "  /    "
    
    scenario "User enters a single digit followed by slash", ->
      given "an empty input", ->
      
      when_ "entering a single digit followed by slash", ->
        input.mashKeys "4/"
      
      then_ "input value should have month zero padded", ->
        expect(input).toHaveValue "04/    "
    
    scenario "User enters a valid two digit month", ->
      given "an empty input", ->
      
      when_ "entering '09'", ->
        input.mashKeys "09"
      
      then_ "input value should advance to year field", ->
        expect(input).toHaveValue "09/    "
    
    scenario "User enters a year less than 30, not 19 or 20", ->
      given "an input with the month already entered", ->
        input.mashKeys "09"
      
      when_ "entering '18'", ->
        input.mashKeys "18"
      
      then_ "input value should assume 2000s and prefix accordingly", ->
        expect(input).toHaveValue "09/2018"

    scenario "user starts to enter a year beginning with 20", ->
        given "an input with the month already entered", ->
        input.mashKeys "09"

        when_ "entering '20'", ->
        input.mashKeys "20"

        then_ "input value should just reflect the '20' that was entered", ->
            expect(input).toHaveValue "09/20  "

    scenario "user starts to enter a year beginning with 19", ->
        given "an input with the month already entered", ->
        input.mashKeys "09"

        when_ "entering '19'", ->
        input.mashKeys "19"

        then_ "input value should just reflect the '19' that was entered", ->
            expect(input).toHaveValue "09/19  "
  

    scenario "User enters a year greater than 29", ->
      given "an input with the month already entered", ->
        input.mashKeys "09"
      
      when_ "entering '64'", ->
        input.mashKeys "64"
      
      then_ "input value should assume 1900s and prefix accordingly", ->
        expect(input).toHaveValue "09/1964"

