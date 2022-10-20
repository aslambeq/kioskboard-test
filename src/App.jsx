import reactLogo from './assets/react.svg'
import './App.css'
import 'react-simple-keyboard/build/css/index.css'
import DefaultInput from './components/DefaultInput'
import NumberFormatInput from './components/NumberFormatInput'

function App() {
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

      {/* <DefaultInput /> */}
      <NumberFormatInput />
    </div>
  )
}

export default App
