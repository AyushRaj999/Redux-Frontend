import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FormDetails from './component/FormDetails.jsx'
// import { setUserDetails } from './reduxStore/slice/counter/index.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FormDetails/>
    </>
  )
}

export default App
