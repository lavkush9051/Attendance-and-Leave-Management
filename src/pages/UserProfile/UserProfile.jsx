
import React, { useState, useEffect, useContext, useRef } from "react";
import LeaveManagement from "../leave-management/LeaveManagement";
import BasicDetails from "./BasicDetails";
import Dashboard from "../dashboard/Dashboard";
import AdminPanel from "../AdminPanel/AdminPanel";
import PayrollAndTaxCenter from "../PayrollAndTaxCenter/PayrollAndTaxCenter";
import ReportingLevel from "../ReportingLevel/ReportingLevel"
import "./UserProfile.css";
import { AuthContext } from "../../context/AuthContext";

const EmployeeProfile = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const { employee } = useContext(AuthContext);
  const { isAuthenticated, logout, } = useContext(AuthContext);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      setSidebarOpen(!mobile); // show if desktop, hide if mobile
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, sidebarOpen]);

  const handleTabClick = (page) => {
    setActivePage(page);
    if (isMobile) setSidebarOpen(false); // hide sidebar on tab click in mobile
  };

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "leave":
        return <LeaveManagement />;
      case "payroll":
        return <PayrollAndTaxCenter />;
      case "reporting":
        return <ReportingLevel />;
      case "admin":
        return <AdminPanel />;
      case "profile":
        return <BasicDetails />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="employee-dashboard">
      {/* Hamburger Button */}
      {/* {isMobile && (
        <button
          className="hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
      )} */}

      {isMobile && !sidebarOpen && (
        <button
          className="hamburger"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
      )}


      <div ref={sidebarRef} className={`left-profile ${sidebarOpen ? "show" : ""}`}>
        <div className="sidenav-profile-card">
          <div className="profile-avatar-wrap">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              className="profile-pic"
            />
          </div>
          <div className="profile-details">
            <h3 className="profile-name">{employee.emp_name}</h3>
            <p className="job-title">{employee.emp_designation}</p>
            <p className="email">{employee.emp_email}</p>
            <button onClick={logout} className="logout-btn">Logout</button>
            {/* <p className="phone">+91-9876543210</p> */}
          </div>
        </div>


        <div className="side-nav">
          {["dashboard", "leave", "payroll","reporting", "admin", "profile"].map((tab) => (
            <button
              key={tab}
              className={activePage === tab ? "active" : ""}
              onClick={() => handleTabClick(tab)}
            >
              {tab === "dashboard"
                ? "Dashboard"
                : tab === "leave"
                  ? "Leave Management"
                  : tab === "payroll"
                    ? "Payroll & Tax Centre"
                    : tab === "reporting"
                      ? "Reporting Level"
                      : tab === "admin"
                        ? "Admin Panel"
                        : "User Profile"}
            </button>
          ))}
        </div>
      </div>

      <div className="right-card">{renderContent()}</div>
    </div>
  );
};

export default EmployeeProfile;

