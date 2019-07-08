import React from 'react'
import Login from '../Forms/Login'
import { Button, Modal } from "react-bootstrap";

let loginmodal = (props) =>{
    return(
        <Modal className = "login-modal" show = {props.show} onHide = {props.onHide}>
                    <Modal.Header closeButton onClick = {props.close}>
        </Modal.Header>
        <Modal.Body>

          <Login {...props} close = {props.onHide}/>
        </Modal.Body>
      </Modal>
        
    )
}

export default loginmodal;