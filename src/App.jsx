import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from './Pages/Login'
import ForgotPassword from './Pages/Forgotpassword'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <ForgotPassword/>
    </>
  )
}

export default App
