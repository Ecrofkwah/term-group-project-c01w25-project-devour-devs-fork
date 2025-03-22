import React, { useEffect, useState } from 'react'
import './MyIntake.css'
import axios from 'axios'
import config from '../../config/config.js'
import MyIntakeStats from '../../components/MyIntakeStats/MyIntakeStats.jsx'

function MyIntake() {
  const [todayIntake, setTodayIntake] = useState(null);
  const [intakes, setIntakes] = useState([]);
  const [statsData, setStatsData] = useState([]);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [intakeDate, setIntakeDate] = useState(null);
  
  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
    setIntakeDate(new Date().toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    // const todayDate = new Date().toISOString().split('T')[0]; 
    if(!token || !intakeDate) return;
    fetchTodayIntake();
    fetchStats();
  }, [token, intakeDate])

  const fetchTodayIntake = async () => {
    try {
        const response = await axios.get(`${config.BASE_URL}/api/intake/totalbydate`, 
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { date: intakeDate }
        },
          
        );
        setTodayIntake(response.data);

        const intakeListResponse = await axios.get(`${config.BASE_URL}/api/intake/get`, 
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { date: intakeDate }
          },
        );
        setIntakes(intakeListResponse.data.intakes);
    } catch (error) {
        setError("No intake data found for today.");
    }
  };

  const fetchStats = async () => {
    try {
        const response = await axios.get(`${config.BASE_URL}/api/intake/lastndays`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const formattedData = response.data.intakes.map((entry) => ({
            date: entry._id,
            calories: entry.totalCalories,
        }));
        setStatsData(formattedData);
    } catch (error) {
        console.error("Error fetching last 5 days intake data.", error);
    }
  };

  const deleteIntake = async (id) => {
    try {
        await axios.delete(`${config.BASE_URL}/api/intake/delete`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {intakeId: id}
          }
        );
        setIntakes(intakes.filter((intake) => intake._id !== id));
        fetchTodayIntake(intakeDate);
    } catch (error) {
        console.error("Error deleting intake", error);
    }
  };


  return (
    <div className='intake-page'>
      <div className='today-intake'>
        <div className='total-intake-wrapper'>
          <div className='total-intake'>
            <h3>Today's Intake</h3>
            <hr style={{border: 'none', width: '100%', height: '1px', backgroundColor: 'black', 
                        margin: '0px 0px 10px 0px', opacity: '1'}}></hr>
            {error ? <div className='intake-error-message'>{error}</div> : (
            <div className='intake-summary'>
              <div><b>Total Calories:</b> {todayIntake?.totalCalories?.toFixed(2)} kcal</div>
              <div><b>Total Protein:</b> {todayIntake?.totalProtein?.toFixed(2)} g</div>
              <div><b>Total Carbs:</b> {todayIntake?.totalCarbs?.toFixed(2)} g</div>
              <div><b>Total Fat:</b> {todayIntake?.totalFat?.toFixed(2)} g</div>
            </div>
            )}
          </div>
          
        </div>
        
        <h3>What you have taken today</h3>
        <div className="intake-carousel-container">
          <div className='intake-carousel'>
            {(!intakes || intakes.length===0) && <div className='no-intake-msg'>No intake found for today</div>}
            {intakes && intakes.map((intake, index) => (
              <div 
                key={intake._id}
                className="intake-carousel-item"
              >
                <h6>{intake.category.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}</h6>
                <hr style={{border: 'none', width: '100%', height: '1px', backgroundColor: 'black', 
                            margin: '0px 0px 10px 0px'}}></hr>
                <div>Portion: {intake.portion} g</div>
                <div>Calories: {intake.calories?.toFixed(2)} kcal</div>
                <div>Protein: {intake.protein?.toFixed(2)} g</div>
                <div>Carbs: {intake.carbs?.toFixed(2)} g</div>
                <div>Fat: {intake.fat?.toFixed(2)} g</div>
                <button className="intake-delete-btn" onClick={()=> deleteIntake(intake._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats for Intake */}
      <MyIntakeStats statsData={statsData}/>
    </div>
  )
}

export default MyIntake
