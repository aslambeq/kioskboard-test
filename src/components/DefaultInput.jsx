import React, { useEffect, useRef, useState } from 'react'
import Keyboard from 'react-simple-keyboard'

const DefaultInput = () => {
  const [input, setInput] = useState('+79858335567')
  const [inputName, setInputName] = useState('tel')
  const [layout, setLayout] = useState('default')
  const keyboardRef = useRef(null)
  const inputRef = useRef(null)

  const logCarets = () => {
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

  useEffect(() => {
    logCarets()

    if (keyboardRef.current === null) return
    if (inputRef.current === null) return

    keyboardRef.current.setInput(input, inputName)

    keyboardRef.current.setCaretPosition(
      inputRef.current.selectionStart,
      inputRef.current.selectionEnd
    )
  }, [keyboardRef.current, inputRef.current])

  const onChange = (input) => {
    setInput(input)

    inputRef.current.focus()

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

    logCarets()
  }

  const onChangeInput = (event) => {
    const input = event.target.value
    const inputName = event.target.name
    setInputName(inputName)
    setInput(input)
    keyboardRef.current.setInput(input, inputName)
  }

  return (
    <div className='default-input'>
      <div className='test'>
        <input
          onFocus={(e) => {
            setInputName(e.target.name)
            logCarets()
          }}
          className='test-input'
          value={input}
          onChange={onChangeInput}
          ref={inputRef}
          type='text'
          name={inputName}
          id='tel'
          onBlur={(e) => {
            e.target.focus()
          }}
        />
        <Keyboard
          keyboardRef={(r) => (keyboardRef.current = r)}
          layoutName={layout}
          onChange={onChange}
          onKeyPress={onKeyPress}
          inputName={inputName}
        />
      </div>
    </div>
  )
}

export default DefaultInput
