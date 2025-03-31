import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Label } from 'recharts'
import './MyIntakeStats.css'

function MyIntakeStats({statsData}) {
  const today = new Date().toISOString().split('T')[0];
  return (
    <div className='intake-stats'>
      <h3>Calories Intake Trend in the Last 5 Days</h3>
      {statsData.length===0 && <div>No information available. You should add more intake</div>}

      {statsData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={statsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date">
              <Label value="Date" position="insideBottom" offset={-5} />
              <LabelList dataKey="day" position="bottom" offset={10} />
            </XAxis>
            <YAxis>
              <Label value="Total Calories Intake (kcal)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
            </YAxis>
            <Tooltip formatter={(value) => `${value.toFixed(2)} kcal`}/>
            <Bar dataKey="calories" fill="#3498db">
              <LabelList position="top" fill="#000" fontSize={14} formatter={(value) => `${value.toFixed(2)} kcal`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default MyIntakeStats
