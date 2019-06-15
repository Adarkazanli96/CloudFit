import React from 'react'
import './Dropdown.css'
import account from '../assets/images/account.png'
import { Auth } from 'aws-amplify'


let dropdown = (props) =>(
<div class="dropdown">
  <button class="dropbtn"><img src = {account} /></button>
  <div class="dropdown-content">
    <a>My Account</a>
    <a>Help Center</a>
    <button onClick = {props.logout}>Sign Out</button>
  </div>
</div>
)

export default dropdown