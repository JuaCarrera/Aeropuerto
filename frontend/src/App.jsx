import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Aereolinea</h1>
      <div className="card"> 
      </div>
      <p className="read-the-docs">
        Programación competitiva
      </p>
    </>
  )
}

export default App
