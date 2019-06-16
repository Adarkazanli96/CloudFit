import React from 'react'
import Login from '../containers/Login'
import { Button, Modal } from "react-bootstrap";

let loginmodal = (props) =>{
    return(
        <Modal show = {props.show} onHide = {props.onHide}>
            <Modal.Header closeButton onClick = {props.onHide}>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login {...props} close = {props.onHide}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
        
    )
}

export default loginmodal;