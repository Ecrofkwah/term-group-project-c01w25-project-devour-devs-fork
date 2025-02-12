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
    // Check if user is logged in
    axios.get(`${config.BASE_URL}/api/auth/me`, {withCredentials: true})
      .then(response => {
        setLoginUser(response.data);
        console.log("logged in")
      })
      .catch(error => {
        setLoginUser(null);
        console.log("none")
      })
  }, [])

  const handleLogout = () => {
    axios.post(`${config.BASE_URL}/api/auth/logout`)
    .then((response) => {
      if(response.data.success){
        navigate("/");
      } else {
        setError(response.data.message)
      }
    })
    .catch((error) => {
     if(error.response.status === 401){
      setError(error.response.data.message)
     } else {
      setError("Something went wrong. Please try again")
     }
    })
  }

  return (
    <BrowserRouter>
      <AppNavbar loginUser={loginUser}/>
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
