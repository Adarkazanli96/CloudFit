import React from 'react'
import { Modal } from "react-bootstrap";

let uploadmodal = (props) =>{
    return(
        <div>

            <Modal.Header closeButton onClick = {props.close}>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>

        </div>
        
    )
}

export default uploadmodal;