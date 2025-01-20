// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Optional for custom styling

const Sidebar = ({ links }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Rental Management</h2>
      </div>
      <ul className="sidebar-links">
        {links.length === 0 ? (
          <li>No links available</li>
        ) : (
          links.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                className="sidebar-link"
                activeClassName="active"
                exact
              >
                {link.label}
              </NavLink>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
