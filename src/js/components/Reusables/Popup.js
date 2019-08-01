import React from 'react'
import '../../../css/components/Reusables/Popup.css'
import closeIcon from '../../../assets/images/close.png'

import { ReactComponent as Check} from '../../../assets/images/popup/success.svg'


let popups = props =>{
    
        return(
                <div className = {"popup-container " + props.color}>
                        <Check/>
                        <button onClick = {props.close} className = "close-btn"><img src = {closeIcon}/></button>
                        <div className = "content">
                        {props.content}
                        </div>
                </div>
        
        );
    
}

export default popups;