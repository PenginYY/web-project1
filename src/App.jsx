import { useState } from 'react'
import './App.css'
import Sidebar from './routes/Sidebar'
import Dashboard from './routes/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='grid-container'>
      <Sidebar />
      <Dashboard />
    </div>
  )
}

export default App
