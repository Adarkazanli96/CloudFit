import React from 'react'
import './Dropdown.css'
import account from '../assets/images/account.png'
import { Auth } from 'aws-amplify'


let dropdown = (props) =>(
<div class="dropdown1">
  <button class="dropbtn1"><img src = {account} /></button>
  <div class="dropdown-content1">
    <a href="#">Account</a>
    <a href="#">Help Center</a>
    <button onClick = {props.logout}>Sign Out</button>
  </div>
</div>
)

export default dropdown