import React from 'react'
import { Button, Modal } from "react-bootstrap";

let uploadmodal = (props) =>{
    return(
        <div>

            <Modal.Header closeButton onClick = {props.close}>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick = {props.close}>Close</Button>
        </Modal.Footer>
        </div>
        
    )
}

export default uploadmodal;