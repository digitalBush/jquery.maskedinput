feature "Progressive Reveal", ->
  
  story "User interacts with an input with 'mmddyyyy' predefined autocomplete settings and 'progressive_reveal' set to true", ->
 
    beforeEach ->
      input.mask "mm/dd/yyyy", 
        placeholder: " "
        autocomplete: $.mask.autocomplete_predefined["mmddyyyy"]
        progressive_reveal: true

    scenario "User hasn't entered anything yet", ->

      given "An empty input", ->
        null

      whilst "User does nothing", ->
        null

      hence "Input is blank", ->
        (expect input).toHaveValue ''
        
    scenario "User enters two digit month", ->

      given "An empty input", ->
        null

      whilst "User enters valid month", ->
        input.mashKeys "11"

      hence "Input advances to the day of month field", ->
        (expect input).toHaveValue "11/"
        (expect input.caret().begin).toEqual 3

    scenario "User enters two digit month, then backspace", ->

      given "An empty input", ->
        null

      whilst "User enters valid month", ->
        input.mashKeys "11"

      likewise "User hits backspace", ->
        input.mashKeys (keys) ->
          keys.type keys.backspace
        

      hence "Input deletes slash and second digit of month", ->
        (expect input).toHaveValue "1"

      likewise "The cursor is positioned after the first digit of month", ->
        (expect input.caret().begin).toEqual 1


