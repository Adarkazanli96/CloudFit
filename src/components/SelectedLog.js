import React from 'react'
import { Auth, API } from 'aws-amplify';
import LineChart from './LineChart'
import './SelectedLog.css'
import backIcon from '../assets/images/back-icon.png'

const formatDate = (workoutDate) => {
    let date = new Date(workoutDate);
    let day = date.toDateString();
   let res = day.split(" ")
   let time = date.toLocaleTimeString();
   date = res[1] + " " + res[2] + ", " + res[3] + " " + time;
   return date;
 }

let selectedLog = props =>{

    if(props.selected === null){
        return <div></div>;
    }
    console.log("within the selected log component", props.selected)
    const {timestamp} = props.selected
    const { workoutDate, duration, caloriesBurned, maximumHeartRate, meanHeartRate, notes, records} = props.selected.data //destructuring

    let date = formatDate(workoutDate)
    let submissionDate = formatDate(timestamp)
    
        return(
                <div style = {{fontSize : "12px", margin: "0 auto"}}>
                    <button className = "back-btn" onClick = {props.back}><img src = {backIcon}/>Back</button>
                    <div>

                    
                    <span style = {{fontWeight: "bold", marginRight: "17px"}}>{"Workout Date: "}</span>{date}
                    <span style = {{fontWeight: "bold", marginRight: "17px", marginLeft: "90px"}}>{"Submission Date: "}</span>{submissionDate}
                    </div>
                        <LineChart height = {"300px"} width = {"400px"} records = {records}/>
                            
                        
                    <div className = "heart-rates">Max Heart Rate: {maximumHeartRate}</div>
                    <div className = "heart-rates">Mean Heart Rate: {meanHeartRate}</div>
               <span className = 'heart-rates'>{"Notes: "}{notes}</span>
                </div>
        
        );
    
}

export default selectedLog;