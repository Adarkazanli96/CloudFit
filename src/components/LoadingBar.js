import React from 'react'
import { Glyphicon } from "react-bootstrap";
import './LoadingBar.css'

export default props =>{
    
        return(
                        <div className = "submit-bar-container">
                            <Glyphicon glyph="refresh" className="spinning"/>Submitting
                        </div>

        
        );
    
}