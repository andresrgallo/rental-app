import React from 'react';
import {NavLink} from 'react-router-dom';
import './css/NavBar.css';

export default function NavBar() {
  return (
    <div className="menuBar ">
      <div className="container">
        <ul>
          <li className="logo">
            <NavLink exact activeClassName="active" to="/">
              <ion-icon name="home" className="icon" />
              <span>Unique Rentals</span>
            </NavLink>
          </li>
          <li className="tenants">
            <NavLink activeClassName="active" to="/leases">
              Tenants List
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
