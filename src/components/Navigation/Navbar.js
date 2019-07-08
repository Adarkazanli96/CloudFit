import React from 'react';
import logo from '../../assets/images/navbar_icons/logo.png'
import './Navbar.css';

const toolbar = props => (
  <header className="toolbar" id = "the-nav">
    <nav className="toolbar__navigation">
        <div className="toolbar__logo"><h3 style = {{display: "inline"}}>CloudFit</h3><img src = {logo}/></div>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
                <span>{props.children}</span>
        </div>
    </nav>
  </header>
);

export default toolbar;