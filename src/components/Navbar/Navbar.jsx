
import React from 'react';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css'; // we will create this file for styling
import logo from '../../assets/jnpt-logo.png';
import { FaUserCircle } from 'react-icons/fa';


const ADMIN_ROLES = [
  "MANAGER",
  "SENIOR MANAGER",
  "GENERAL MANAGER",
  "DY GENERAL MANAGER",
  "ASSISTANT MANAGER"
];


function Navbar() {
  const { isAuthenticated, logout, employee } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const canSeeAdmin = employee && ADMIN_ROLES.includes(employee.emp_designation?.toUpperCase());


  const { isClockedIn, clockOut } = useContext(AuthContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleClockOut = () => {
    clockOut();
    // Optionally, show message or redirect to dashboard
  };


  return (
    <nav className="navbar">
      <div className="left-logo">
        <img src={logo} alt="JNPA Logo" />
        <span className="title">JNPA</span>
      </div>

      {/* <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>

      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        

        {isAuthenticated ? (
          <>
          <li><Link to="/dashboard">Dashboard</Link></li>

          <li><Link to="/leave-management">Leave Management</Link></li>
     
          <li><Link to="/reporting-level">Reporting Level</Link></li>
          <li><Link to="/payroll-taxcenter">Payroll & Tax Center</Link></li>
          {canSeeAdmin && <li><Link to="/admin">AdminPanel</Link></li>}
          <button onClick={logout} className="logout-btn">Logout</button>
          <Link className="userprofile-icon" to="/profile">
            <FaUserCircle  style={{ fontSize: "25px", color: "white" }}/>
          </Link>

          </>
        ):(
          <>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          </>
        )}
        
      </ul> */}
    </nav>
  );
}

export default Navbar;

