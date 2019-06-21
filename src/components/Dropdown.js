import React from 'react'
import './Dropdown.css'
import account from '../assets/images/navbar_icons/account.png'
import { Auth } from 'aws-amplify'


let dropdown = (props) =>(
<div className="dropdown">
  <button className="dropbtn"><img src = {account} /></button>
  <div className="dropdown-content">
    <a>My Account</a>
    <a>Help Center</a>
    <button onClick = {props.logout}>Sign Out</button>
  </div>
</div>
)

export default dropdown