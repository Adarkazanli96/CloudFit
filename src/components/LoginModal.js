import React from 'react'
import Login from '../containers/Login'
import { Button, Modal } from "react-bootstrap";

let loginmodal = (props) =>{
    return(
        <Modal className = "login-modal" show = {props.show} onHide = {props.onHide}>
        <Modal.Body>
          <button style = {{float: "right", backgroundColor: "transparent", color: "#606c85", fontSize: "20pt", border: "none"}} onClick = {props.onHide}>X</button>
          <Login {...props} close = {props.onHide}/>
        </Modal.Body>
      </Modal>
        
    )
}

export default loginmodal;