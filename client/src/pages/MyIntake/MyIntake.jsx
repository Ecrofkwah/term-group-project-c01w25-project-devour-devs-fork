import React, { useEffect } from 'react'
import 'MyIntake.css'
import axios from 'axios'

function MyIntake() {
  const [todayIntake, setTodayIntake] = useState(null);
  const todayDate = new Date().toISOString().split('T')[0]; 
  
  return (
    <div>
      
    </div>
  )
}

export default MyIntake
