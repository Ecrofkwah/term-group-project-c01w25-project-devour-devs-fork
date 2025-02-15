import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./App.css"
import Home from './pages/Home/Home'
import LogIn from './pages/LogIn/LogIn'
import Register from './pages/Register/Register'
import AppNavbar from './components/AppNavbar/AppNavbar'
import axios from 'axios'
import config from './config/config'

function App() {
  const [loginUser, setLoginUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("jwt")

    // Check if user is logged in
    if(token){
      axios.get(`${config.BASE_URL}/api/auth/me`, {
        headers: {Authorization: `Bearer ${token}`}
      }, {withCredentials: true})
      .then(response => {
        setLoginUser(response.data);
        console.log("logged in")
      })
      .catch(error => {
        setLoginUser(null);
        console.log("none")
      })
    }
    
  }, [])

  return (
    <BrowserRouter>
      <AppNavbar loginUser={loginUser} setLoginUser={setLoginUser}/>
      <div className='pages'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
