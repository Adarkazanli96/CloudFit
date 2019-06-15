import React from 'react';

import './Navbar.css';

const toolbar = props => (
  <header className="toolbar" id = "the-nav">
    <nav className="toolbar__navigation">
        <div className="toolbar__logo"><a href="/">THE LOGO</a></div>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
                <span>{props.children}</span>
        </div>
    </nav>
  </header>
);

export default toolbar;