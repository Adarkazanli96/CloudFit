import React from 'react'
import "./Sheet.css"

let sheet = props =>{
    
        return(
                <div className = "sheet">
                    Date: {props.data.body.workoutDate}
                    Time: {props.data.body.workoutTime}
                </div>
        
        );
    
}

export default sheet;