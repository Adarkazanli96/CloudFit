import React from 'react'
import '../../../css/components/Reusables/Popup.css'
import closeIcon from '../../../assets/images/close.png'

let popups = props =>{
    
        return(
                <div className = {"popup-container " + props.color}>
                        <button onClick = {props.close} className = "close-btn"><img src = {closeIcon}/></button>
                        <div className = "content">
                        {props.content}
                        </div>
                </div>
        
        );
    
}

export default popups;