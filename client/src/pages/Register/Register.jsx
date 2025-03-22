import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import config from '../../config/config.js'
import './Register.css'

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleRegister = (e) => {
      e.preventDefault()
  
      // validate user input
      if(password.length < 8){
        setError("Password must be at least 8 characters")
        return
      }

      if(password !== confirmPassword){
        setError("Passwords do not match")
        return
      }

      axios.post(`${config.BASE_URL}/api/auth/register`, {
          username, email, password
      })
      .then((response) => {
          if(response.data.success){
              navigate("/login");
          } else {
              setError(response.data.message);
          }
      })
      .catch((error) => {
        if(error.response.data.errors){
            setError(error.response.data.errors[0].msg)
        }
        else{
           setError(error.response.data.message) 
        }
      })
    }
  
    return (
    <div className='register-page'>
      <div className="register-container">
        <h1>Sign Up</h1>
        <form className="register-form" onSubmit={handleRegister}>
            <div className='field'>
                <label htmlFor="username">Username: </label>
                <input 
                    type="text" 
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                /> 
            </div>
              
            <div className='field'>
                <label htmlFor="email">Email: </label>
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
                <label htmlFor="password">Password: </label>
                <input 
                    type="password" 
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className='field'>
                <label htmlFor="confirm-password">Confirm Password: </label>
                <input 
                    type="password" 
                    id="confirm-password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            
            {error ? <div className="error-message">{error}</div> : <></>}

            <button type="submit">Sign Up</button>
            <p>Already have an account?</p>
            <Link to="/login"><div>Log In</div></Link>
        </form>
      </div>
    </div>
    )
}

export default Register
