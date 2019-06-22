import React from 'react'
import './Popup.css'

let popups = props =>{
    
        return(
                <div className = {"popup-container " + props.color}>
                        <div className = "content">
                        {props.content}
                        </div>

                </div>
        
        );
    
}

export default popups;