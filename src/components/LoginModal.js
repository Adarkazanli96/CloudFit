import React from 'react'
import Login from '../containers/Login'
import { Button, Modal } from "react-bootstrap";

let loginmodal = (props) =>{
    return(
        <div>

            <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login {...props} loaded = {props.onHide}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </div>
        
    )
}

export default loginmodal;