import React from 'react'
import "./Sheet.css"

let sheet = props =>{
    //console.log(props.data.body);
        return(
                <div className = "sheet">
                    <span className = "left-block">
                    <span className = "date">Date: {props.data.body.workoutDate}</span>
                    <span className = "time">Time: {props.data.body.workoutTime}
                    </span>
                    <br/>
                    Duration: {props.data.body.duration}
                    <br/>
                    Maximum Heart Rate: {props.data.body.maximumHeartRate}
                    <br/>
                    Mean Heart Rate: {props.data.body.meanHeartRate}
                    <br/>
                    Notes: {props.data.body.notes}
                
                        </span>

                        <span className = "right-block">
                            <div className = "graph">Data</div>
                        </span>

                </div>
        
        );
    
}

export default sheet;