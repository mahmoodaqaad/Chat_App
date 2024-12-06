import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import { Container } from 'react-bootstrap'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Chats from './Pages/Chats'
import Register from './Pages/Register'
import Login from './Pages/Login'
import NavBar from './Components/NavBar'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import ChatContextPrvider from './context/ChatContext'
const App = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className=' text-white'>
      <Router>
        <ChatContextPrvider user={user}>

          <NavBar user={user} />
          <Container >
            <Routes>
              <Route path='/login' element={user ? <Chats /> : <Login />} />
              <Route path='/register' element={user ? <Chats /> : <Register />} />
              <Route path='/' element={user ? <Chats /> : <Login />} />

            </Routes>
          </Container >
        </ChatContextPrvider>
      </Router>
    </div>
  )
}

export default App
