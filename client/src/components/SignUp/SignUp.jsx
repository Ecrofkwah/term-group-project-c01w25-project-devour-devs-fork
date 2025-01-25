import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import config from '../../config/config.js'
import './SignUp.css'

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const SignUserUp = (e) => {
    e.preventDefault()

    axios.post(`${config.BASE_URL}/api/auth/signup`, {
        username, email, password
    })
    .then((response) => {
        console.log(response.data)
        navigate("/login");
    })
    .catch((error) => console.log(`Sign up error: ${error}`))
  }

  return (
    <div className="sign-up-container" onSubmit={SignUserUp}>
        <form className="sign-up-form">
            <h1>Sign Up</h1>
            <div>
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
            
            <div>
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
            
            <div>
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
            
            <button type="submit">Sign Up</button>
            <Link to="/login"><button>Log In</button></Link>
        </form>
    </div>
  )
}

export default SignUp
