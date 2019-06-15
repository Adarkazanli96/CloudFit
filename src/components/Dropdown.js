import React from 'react'
import './Dropdown.css'
import account from '../assets/images/account.png'


let dropdown = (props) =>(
<div class="dropdown1">
  <button class="dropbtn1"><img src = {account} /></button>
  <div class="dropdown-content1">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
</div>
)

export default dropdown