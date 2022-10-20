import React, { useEffect, useRef, useState } from 'react'
import { PatternFormat } from 'react-number-format'
import Keyboard from 'react-simple-keyboard'

const IS_LOG_ENABLED = false

const logCarets = () => {
  if (!IS_LOG_ENABLED) return
  console.log(
    '🚀 ~ App ~ inputRef',
    inputRef.current.selectionStart,
    inputRef.current.selectionEnd
  )
  console.log(
    '🚀 ~ App ~ keyboardRef',
    keyboardRef.current.getCaretPosition(),
    keyboardRef.current.getCaretPositionEnd()
  )
}

const plusSignRegex = new RegExp(/^\+/, 'i')

const NumberFormatInput = () => {
  const [value, setValue] = useState('+78885553535')
  const [layout, setLayout] = useState('default')
  const [inputName, setInputName] = useState('tel')
  const keyboardRef = useRef(null)
  const inputRef = useRef(null)

  const onChange = (inputValue) => {
    let newValue = inputValue

    if (!plusSignRegex.test(inputValue)) {
      newValue = `+${inputValue}`
      keyboardRef.current.setInput(newValue, inputName)
    }

    setValue(newValue)

    // inputRef.current.focus()

    logCarets()
  }

  const handleShift = () => {
    const newLayoutName = layout === 'default' ? 'shift' : 'default'
    setLayout(newLayoutName)
  }

  const onKeyPress = (button) => {
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === '{shift}' || button === '{lock}') handleShift()
  }

  const onChangeInput = (event) => {
    const inputValue = event.target.value
    const inputName = event.target.name
    setInputName(inputName)
    setValue(inputValue)
    keyboardRef.current.setInput(inputValue, inputName)
  }

  useEffect(() => {
    if (keyboardRef.current === null) return
    if (inputRef.current === null) return

    keyboardRef.current.setInput(value, inputName)

    keyboardRef.current.setCaretPosition(
      inputRef.current.selectionStart,
      inputRef.current.selectionEnd
    )
  }, [keyboardRef.current, inputRef.current])

  useEffect(() => {
    if (value.length <= 0) {
      const newValue = '+'
      setValue(newValue)

      keyboardRef.current.setInput(newValue, inputName)
    }
  }, [value])

  return (
    <div className='number-format-input'>
      <div className='test'>
        <PatternFormat
          onClick={(e) => {
            setInputName(e.target.name)
          }}
          className='test-input test-input_mode_text'
          format='## (###) ### ####'
          mask='_'
          patternChar='#'
          allowEmptyFormatting
          value={value}
          getInputRef={inputRef}
          displayType='text'
          valueIsNumericString
          inputMode='tel'
          name={inputName}
          // id={inputName}
          maxLength={12}
          // onBlur={(e) => {
          //   e.target.focus()
          // }}
        />

        <Keyboard
          keyboardRef={(r) => (keyboardRef.current = r)}
          layoutName={layout}
          onChange={onChange}
          onKeyPress={onKeyPress}
          inputName={inputName}
          maxLength={12}
        />
      </div>
    </div>
  )
}

export default NumberFormatInput
