import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>BoxingYak</h2>
      <input className="search-bar" type="text" placeholder="Search" />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Create New Post</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
