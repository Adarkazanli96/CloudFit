import React from 'react'
import './Cards.css'

let cards = (props) =>(
      <div className="row">
        <div className="column">
          <div className="card">
            <h3>{props.max}</h3>
            <p>Maximum Heart Rate</p>
          </div>
        </div>
      
        <div className="column">
          <div className="card">
            <h3>{props.mean}</h3>
            <p>Average Heart Rate</p>
          </div>
        </div>
        
        <div className="column">
          <div className="card">
            <h3>{props.duration}</h3>
            <p>Duration</p>
          </div>
        </div>
        
        <div className="column">
          <div className="card">
            <h3>{props.calories}</h3>
            <p>Calories</p>
          </div>
        </div>
      </div>
)

export default cards