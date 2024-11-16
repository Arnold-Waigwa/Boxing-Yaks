import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="navbar">
      <h2>BoxingYak</h2>
      <input
        className="search-bar"
        type="text"
        value={searchTerm}
        placeholder="Search Title"
        onChange={handleSearchChange}
      />
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
