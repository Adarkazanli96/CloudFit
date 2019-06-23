import React from 'react'
import './Popup.css'

let popups = props =>{
    
        return(
                <div className = {"popup-container " + props.color}>
                        <button onClick = {props.close} className = "close-btn">X</button>
                        <div className = "content">
                        {props.content}
                        </div>

                </div>
        
        );
    
}

export default popups;