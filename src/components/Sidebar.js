import React from 'react';

import './Sidebar.css';

const sideDrawer = props => {

  return (
    <span className="sidenav">
      <ul>
        <li>
          <a href="/">Products</a>
        </li>
        <li>
          <a href="/">Users</a>
        </li>
      </ul>
    </span>
  );
};

export default sideDrawer;