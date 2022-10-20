import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

function App() {
  const [input, setInput] = useState('')
  const [layout, setLayout] = useState('default')
  const keyboardRef = useRef(null)
  const inputRef = useRef(null)
  console.log('🚀 ~ App ~ inputRef', inputRef)

  useEffect(() => {
    console.log('🚀 ~ App ~ activeElement', document.activeElement)
  }, [document.activeElement])

  const onChange = (input) => {
    setInput(input)
    console.log('Input changed', input)
  }

  const handleShift = () => {
    const newLayoutName = layout === 'default' ? 'shift' : 'default'
    setLayout(newLayoutName)
  }

  const onKeyPress = (button) => {
    console.log('Button pressed', button)

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === '{shift}' || button === '{lock}') handleShift()
  }

  const onChangeInput = (event) => {
    const input = event.target.value
    setInput(input)
    keyboardRef.current.setInput(input)
  }

  return (
    <div className='App'>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>

      <div className='test'>
        <input
          className='test-input'
          value={input}
          onChange={onChangeInput}
          ref={inputRef}
          type='text'
          name='test'
          id='test'
          onBlur={(e) => {
            e.target.focus()
          }}
        />
        <Keyboard
          keyboardRef={(r) => (keyboardRef.current = r)}
          layoutName={layout}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </div>
    </div>
  )
}

export default App
