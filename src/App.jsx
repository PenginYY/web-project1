import { useState } from 'react'
import './App.css'
import Sidebar from './routes/Sidebar'
import Dashboard from './routes/Dashboard'
import Highlighted from './routes/Highlighted'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='grid-container'>
      <Sidebar />
      <Dashboard />
      <Highlighted />
    </div>
  )
}

export default App
