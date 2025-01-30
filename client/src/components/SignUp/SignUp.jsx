import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import config from '../../config/config.js'
import './SignUp.css'

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const SignUserUp = (e) => {
    e.preventDefault()

    axios.post(`${config.BASE_URL}/api/auth/signup`, {
        username, email, password
    })
    .then((response) => {
        console.log(response.data)
        if(response.data.success){
            navigate("/login");
        } else {
            setError(response.data.message);
        }
    })
    .catch((error) => console.log(`Sign up error: ${error}`))
  }

  return (
    <div className="sign-up-container" onSubmit={SignUserUp}>
        <form className="sign-up-form">
            <h1 className="font-bold text-2xl mt-4 mb-4">Sign Up</h1>
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
            <p>Already have an account?</p>
            <Link to="/login"><div className='underline text-purple-900'>Log In</div></Link>
        </form>

        {error ? <div className="pr-1 pl-1 m-2 bg-red-400 rounded">{error}</div> : <></>}
    </div>
  )
}

export default SignUp
