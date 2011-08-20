### Masked Input plugin for jQuery
#
# based upon Masked Input plugin for jQuery by Josh Bush
# (http://digitalbush.com/projects/masked-input-plugin/)
###

$ = jQuery

pasteEventName = (if $.browser.msie then 'paste' else 'input') + '.mask'
iPhone = window.orientation?

$.mask = 
  # Predefined character definitions
  definitions:
    '9': "[0-9]"
    'a': "[A-Za-z]"
    '*': "[A-Za-z0-9]"
    'm': "[0-9/]"
    'd': "[0-9/]"
    'y': "[0-9]"

  dataName: "rawMaskFn"
  autocomplete_predefined:
			'mmddyyyy': [
        { pattern: /^\//, replacement: " " }
				{ pattern: /^([1-9])\//, replacement: "0$1" }
        { pattern: /^((1[3-9])|([2-9]\d)|(0[0\/]))/, replacement: "  " }
        { pattern: /^(\d\d.)\//, replacement: "$1 " }
  			{ pattern: /^(\d\d.)((3[2-9])|([4-9]\d)|(0[0\/]))/, replacement: "$1  " }
  			{ pattern: /^(\d\d.)(\d\/)./, replacement: "$1" + "0" + "$2" }
  			{ pattern: /^(\d\d.\d\d.)(1[0-8]|0\d|2[1-9])(?!\d)/, replacement: "$1" + "20" + "$2" }
  			{ pattern: /^(\d\d.\d\d.)([3-8]\d)(?!\d)/, replacement: "$1" + "19" + "$2" }
			]


			'mmyyyy': [
        { pattern: /^\//, replacement: " " }
				{ pattern: /^(\d)\//, replacement: "0$1" }
        { pattern: /^((1[3-9])|([2-9]\d)|(0[0\/]))/, replacement: "  " }
        { pattern: /^(\d\d.)(1[0-8]|0\d|2[1-9])(?!\d)/, replacement: "$1" + "20" + "$2" }
  			{ pattern: /^(\d\d.)([3-8]\d)(?!\d)/, replacement: "$1" + "19" + "$2" }
			]

$.fn.extend
  caret: (begin, end) ->
    if this.length == 0 then return
    if typeof begin == 'number'
      end = if typeof end == 'number' then end else begin
      return this.each ->
        if this.setSelectionRange
          this.setSelectionRange begin, end
        else if this.createTextRange
          range = this.createTextRange()
          range.collapse true
          range.moveEnd 'character', end
          range.moveStart 'character', begin
          range.select()
    else
      if this[0].setSelectionRange
        begin = this[0].selectionStart
        end = this[0].selectionEnd
      else if document.selection and document.selection.createRange
        range = document.selection.createRange()
        begin = 0 - range.duplicate().moveStart 'character', -100000
        end = begin + range.text.length
      return { begin: begin, end: end}

  unmask: -> return this.trigger "unmask"

  mask: (mask, settings) ->
    if not mask and this.length > 0
      input = $ this[0]
      return (input.data $.mask.dataName)()

    settings = $.extend {
      placeholder: "_"
      completed: null
      autocomplete: []
      progressive_reveal: false
    }, settings

    defs = $.mask.definitions
    tests = []
    partialPosition = mask.length
    firstNonMaskPos = null
    len = mask.length

    $.each (mask.split ""), (i, c) ->
      if c == '?'
        len--
        partialPosition = i
      else if defs[c]
        tests.push (RegExp defs[c])
        firstNonMaskPos = tests.length - 1 if firstNonMaskPos == null
      else
        tests.push null

    (this.trigger "unmask").each ->
      input = $ this
      buffer = $.map (mask.split ""), (c, i) ->
        if c != '?'
          return if defs[c] then settings.placeholder else c
      focusText = input.val()

      seekNext = (pos) ->
        while ++pos <= len and not tests[pos]
          null
        pos

      seekPrev = (pos) ->
        ivala = input.val().split ""
        while --pos >= 0 and not tests[pos]
          ivala[pos] = settings.placeholder
        ivala[pos] = settings.placeholder
        input.val(ivala.join "")
        pos

      shiftL = (begin, end) ->
        return null if begin < 0

        j = seekNext end
        
        for i in [begin...len] 
          if tests[i]
            if j < len and tests[i].test buffer[j]
              buffer[i] = buffer[j]
              buffer[j] = settings.placeholder
            else
              break

            j = seekNext j
        
        writeBuffer()
        input.caret Math.max firstNonMaskPos, begin

      shiftR = (pos) ->
        c = settings.placeholder
        for i in [pos...len]
          if tests[i]
            j = seekNext i
            t = buffer[i]
            buffer[i] = c
            if j < len and tests[j].test t
              c = t
            else
              break

      keydownEvent = (e) ->
        k = e.which
        
        # backspace, delete, and escape get special treatment
        if k == 8 or k == 46 or (iPhone and k == 127)
          {begin, end} = input.caret()

          if end == begin
            begin = if k != 46 then seekPrev begin else end = seekNext begin - 1
            end = seekNext end if k == 46

          clearBuffer begin, end
          shiftL begin, end - 1

          false
        else if k == 27
          # escape
          input.val focusText
          input.caret 0, checkVal()
          false

      keypressEvent = (e) ->
        k = e.which
        i = 0
        startLength = input.mask().length

        pos = input.caret()

        if e.ctrlKey or e.altKey or e.metaKey or k < 32
          true
        else if k
          if pos.end != pos.begin
            clearBuffer pos.begin, pos.end
            shiftL pos.begin, pos.end - 1

          p = seekNext pos.begin - 1
          if p < len
            c = String.fromCharCode k
            if tests[p].test c
              shiftR p
              buffer[p] = c
              writeBuffer()
              next = seekNext p
              input.caret next

              if settings.autocomplete.length > 0
                for i in [0...settings.autocomplete.length]
                  {pattern, replacement} = settings.autocomplete[i]
                  input.val input.val().replace pattern, replacement
                  clearBuffer 0, RegExp.lastMatch.length
                  input.caret checkVal true

              next += input.mask().length - startLength - 1
              if settings.completed and next >= len
                settings.completed.call input
          false

      clearBuffer = (start, end) ->
        for i in [start...end] when i < len
          buffer[i] = settings.placeholder if tests[i]?

      wbCount = 0

      writeBuffer = ->
        if settings.progressive_reveal
          i = 0 
          tmp_array = [] 
          ival = input.val()
          
          until not ival[i]? or ival[i] == buffer[i] == settings.placeholder 
            tmp_array.push ival[i++]
            
          while buffer[i] and buffer[i] != settings.placeholder
            tmp_array.push buffer[i++]

          (input.val tmp_array.join "").val()
        else
          (input.val buffer.join "").val()

      checkVal = (allow) ->
        test = input.val()
        lastMatch = -1
        pos = 0

        for i in [0...len]
          if tests[i]
            buffer[i] = settings.placeholder
            while pos++ < test.length
              c = test.charAt pos - 1
              if tests[pos - 1] and tests[pos - 1].test c
                buffer[i] = c
                lastMatch = i
                break
            if pos > test.length
              break
          else if buffer[i] == test.charAt pos and i != partialPosition
            pos++
            lastMatch = i

        if not allow and lastMatch + 1 < partialPosition
          input.val ""
          clearBuffer 0, len
        else if allow or lastMatch + 1 >= partialPosition
          writeBuffer()
          input.val input.val().substring 0, lastMatch + 1 if not allow
        if partialPosition then i else firstNonMaskPos

      
      input.data $.mask.dataName, ->
        ($.map buffer, (c, i) ->
          if tests[i] and c != settings.placeholder then c else null).join ''

      unless input.attr "readonly"
        input.one "unmask", ->
          input.unbind ".mask"
          input.removeData $.mask.dataName
        .bind "focus.mask", ->
          focusText = input.val()
          pos = checkVal()
          writeBuffer()
          moveCaret = ->
            if pos == mask.length
              input.caret 0, pos
            else
              input.caret pos
          if $.browser.msie then moveCaret else do -> setTimeout moveCaret, 0
        .bind( "blur.mask", ->
          checkVal()
          if input.val() != focusText
            input.change()  
        ).bind(  "keydown.mask", keydownEvent)
        .bind(  "keypress.mask", keypressEvent )
        .bind pasteEventName, ->
          setTimeout (() ->
            input.caret checkVal true), 0

      checkVal() # perform initial check for existing values
