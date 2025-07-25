import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import NavBar from './components/Navbar'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Router />
      </BrowserRouter>
    </>
  )
}

export default App