

// import React from "react";
// import "./UserProfile.css";

// const UserProfile = () => {
//   const user = {
//     fullName: "Lavkush Singh",
//     username: "lavkush",
//     email: "lavkush@example.com",
//     contact: "+91-9876543210",
//     role: "Employee",
//     department: "IT",
//     joined: "2024-01-10",
//     lastLogin: "2024-06-20 08:45",
//     address: "Mumbai, India",
//     avatar: "",
//   };

//   const defaultAvatar =
//     "https://ui-avatars.com/api/?name=Lavkush+Singh&background=0D8ABC&color=fff&size=128";

//   return (
//     <div className="account-page">
//       <h2 style={{ marginBottom: "20px", color: "#003B5C", textAlign: "center" }}>Employee Profile</h2>
//       <div className="account-grid">
//         {/* LEFT VERTICAL CARD */}
//         <div className="profile-card vertical">
//           <img
//             src={user.avatar || defaultAvatar}
//             alt="Profile"
//             className="avatar-img"
//           />
//           <h3>{user.fullName}</h3>
//           <p>@{user.username}</p>
//           <p>{user.email}</p>
//           <p>{user.contact}</p>
//           <p>{user.address}</p>
//         </div>

//         {/* RIGHT GRID CARDS */}
//         <div className="right-cards">
//           <div className="card">
//             <h4>Account Details</h4>
//             <div className="info-item"><strong>Name:</strong> {user.fullName}</div>
//             <div className="info-item"><strong>DOB:</strong> 10 June 1990</div>
//             <div className="info-item"><strong>Gender:</strong> Male</div>
//           </div>

//           <div className="card">
//             <h4>Company Details</h4>
//             <div className="info-item"><strong>Role:</strong> {user.role}</div>
//             <div className="info-item"><strong>Department:</strong> {user.department}</div>
//             <div className="info-item"><strong>Joined:</strong> {user.joined}</div>
//           </div>

//           <div className="card">
//             <h4>Leave Summary</h4>
//             <div className="leave-item"><strong>Privilege Leaves:</strong> 6</div>
//             <div className="leave-item"><strong>Casual Leaves:</strong> 3</div>
//             <div className="leave-item"><strong>Sick Leaves:</strong> 2</div>
//             <div className="leave-item"><strong>Pending Requests:</strong> 1</div>
//           </div>

//           <div className="card">
//             <h4>Login Details</h4>
//             <div className="info-item"><strong>Last Login:</strong> {user.lastLogin}</div>
//             <div className="info-item"><strong>System IP:</strong> 192.168.1.101</div>
//           </div>

//           {/* Add more cards here to see scrolling */}
//           <div className="card">
//             <h4>Work Location</h4>
//             <div className="info-item"><strong>City:</strong> Mumbai</div>
//             <div className="info-item"><strong>Office:</strong> HQ Tower, 3rd Floor</div>
//           </div>
//           <div className="card">
//             <h4>CLOCK IN & OUT TIME</h4>
//             <div className="info-item"><strong>CLOCK IN:</strong> 11:30 AM</div>
//             <div className="info-item"><strong>CLOCK OUT:</strong> 7:00 PM</div>
//             <div className="info-item"><strong>REGULARIZATION TIME:</strong> 1:30 PM</div>

//           </div>

          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
import React, { useState, useEffect, useContext } from "react";
import LeaveManagement from "../leave-management/LeaveManagement";
import BasicDetails from "./BasicDetails";
import Dashboard from "../dashboard/Dashboard";
import AdminPanel from "../AdminPanel/AdminPanel";
import PayrollAndTaxCenter from "../PayrollAndTaxCenter/PayrollAndTaxCenter";
import "./UserProfile.css";
import { AuthContext } from "../../context/AuthContext";
 
const EmployeeProfile = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const { employee } = useContext(AuthContext);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true); // always open on desktop
      else setSidebarOpen(false); // closed by default on mobile/tablet
    };
 
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
 
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
 
     
      <div className={`left-profile ${sidebarOpen ? "show" : ""}`}>
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
    {/* <p className="phone">+91-9876543210</p> */}
  </div>
</div>

 
        <div className="side-nav">
          {["dashboard", "leave", "payroll", "admin", "profile"].map((tab) => (
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

