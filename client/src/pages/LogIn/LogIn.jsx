import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import config from '../../config/config.js'
import './LogIn.css'

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
  
    axios.post(`${config.BASE_URL}/api/auth/login`, {
        email, password
    }, {withCredentials: true})
    .then((response) => {
        if(response.data.success && response.data.token){
          localStorage.setItem("jwt", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          navigate("/");
          window.location.reload()
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
    <div className='log-in-page'>
      <div className='log-in-container'>
        <h1>Login</h1>
        <form className="log-in-form" onSubmit={handleLogin}>
            {error ? <div className="error-message">{error}</div> : <></>}
            <div className='field'>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /> 
            </div>
              
            <div className='field'>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
              
            <button type="submit">Log In</button>
            <p>Don't have an account?</p>
            <Link to="/register"><div>Create an account</div></Link>
        </form>
      </div>
    </div>
  )
}

export default LogIn
