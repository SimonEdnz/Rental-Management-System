// TenantSidebar.js
import React from 'react';
import { Link } from 'react-router-dom'; // or any routing library you're using

const TenantSidebar = () => {
  const sidebarStyle = {
    width: '250px',
    height: '100vh',
    backgroundColor: '#2c3e50',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '20px',
  };

  const ulStyle = {
    listStyleType: 'none',
    paddingLeft: '0',
  };

  const liStyle = {
    marginBottom: '15px',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    display: 'block',
    padding: '10px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  };

  const linkHoverStyle = {
    backgroundColor: '#34495e',
  };

  return (
    <div style={sidebarStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link to="/tenant/dashboard" style={linkStyle} onMouseOver={(e) => e.target.style.backgroundColor = '#34495e'} onMouseOut={(e) => e.target.style.backgroundColor = ''}>
            Dashboard
          </Link>
        </li>
        <li style={liStyle}>
          <Link to="/tenant/profile" style={linkStyle} onMouseOver={(e) => e.target.style.backgroundColor = '#34495e'} onMouseOut={(e) => e.target.style.backgroundColor = ''}>
            My Profile
          </Link>
        </li>
        <li style={liStyle}>
          <Link to="/tenant/bills" style={linkStyle} onMouseOver={(e) => e.target.style.backgroundColor = '#34495e'} onMouseOut={(e) => e.target.style.backgroundColor = ''}>
            My Bills
          </Link>
        </li>
        <li style={liStyle}>
          <Link to="/tenant/notifications" style={linkStyle} onMouseOver={(e) => e.target.style.backgroundColor = '#34495e'} onMouseOut={(e) => e.target.style.backgroundColor = ''}>
            Notifications
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TenantSidebar;
