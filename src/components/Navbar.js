import React from 'react';
import "./Navbar.css";
import logo from "./nuego_logo.png"

export default function Navbar() {
  return (
    <nav>
        <div className="logo"><img src={logo} ></img></div>
        <ul>
            <li><a href="/">Notifications</a></li>
            <li><a href="/">My Bookings</a></li>
            <li><a href="/">Manage Bookings</a></li>
            <li><a href="/">Profile</a></li>
        </ul>
    </nav>
  )
}
