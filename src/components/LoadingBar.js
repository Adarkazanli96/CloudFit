import React from 'react'
import { Glyphicon } from "react-bootstrap";
import './LoadingBar.css'

export default props =>{
    
        return(
                        <span className = "submit-bar-container">
                            <Glyphicon glyph="refresh" className="spinning"/>Submitting
                        </span>

        
        );
    
}