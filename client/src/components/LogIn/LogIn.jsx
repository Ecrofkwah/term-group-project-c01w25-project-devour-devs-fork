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
  
    const LogUserIn = (e) => {
      e.preventDefault()
  
      axios.post(`${config.BASE_URL}/api/auth/login`, {
          email, password
      })
      .then((response) => {
          console.log(response.data)
          if(response.data.success){
            navigate("/dashboard");
          } else {
            setError(response.data.message)
          }
          
      })
      .catch((error) => console.log(`Sign up error: ${error}`))
    }
  
    return (
      <div className="log-in-container" onSubmit={LogUserIn}>
          <form className="log-in-form">
              <h1 className="font-bold text-2xl mt-4 mb-4">Log In</h1>
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
              
              <button type="submit">Log In</button>
              <p>Don't have an account?</p>
              <Link to="/"><div className='underline text-purple-900'>Create an account</div></Link>
          </form>

          {error ? <div className="pr-1 pl-1 m-2 bg-red-400 rounded">{error}</div> : <></>}
      </div>
    )
}

export default LogIn
