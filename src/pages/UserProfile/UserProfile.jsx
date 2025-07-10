// // import React, { useState } from "react";
// // import "./UserProfile.css";

// // const UserProfile = () => {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// //   const toggleSidebar = () => {
// //     setIsSidebarOpen(!isSidebarOpen);
// //   };

// //   const user = {
// //     fullName: "Lavkush Singh",
// //     username: "lavkush",
// //     email: "lavkush@example.com",
// //     contact: "+91-9876543210",
// //     role: "Employee",
// //     department: "IT",
// //     joined: "2024-01-10",
// //     lastLogin: "2024-06-20 08:45",
// //     address: "Mumbai, India",
// //     avatar: "",
// //   };

// //   const defaultAvatar =
// //     "https://ui-avatars.com/api/?name=Lavkush+Singh&background=0D8ABC&color=fff&size=128";

// //   return (
// //     <div className="userprofile-container">
// //       {/* Hamburger Button for Mobile */}
// //       <div className="hamburger" onClick={toggleSidebar}>
// //         ☰
// //       </div>
// //       <h2>Employee Profile</h2>
// //       {/* Sidebar (Left Card) */}
// //       <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
// //         <img
// //           src={user.avatar || defaultAvatar}
// //           alt="Profile"
// //           className="avatar-img"
// //         />
// //         <h3>{user.fullName}</h3>
// //         <p>@{user.username}</p>
// //         <p>{user.email}</p>
// //         <p>{user.contact}</p>
// //         <p>{user.address}</p>
// //         <nav className="sidebar-nav">
// //           <a href="#">Dashboard</a>
// //           <a href="#">Profile</a>
// //           <a href="#">Settings</a>
// //         </nav>
// //       </div>

// //       {/* Main Content (Right Card) */}
// //       <div className="main-content">
  

// //   <div className="card-grid">
// //     <div className="card">
// //       <h4>Account Details</h4>
// //       <div className="info-item"><strong>Name:</strong> {user.fullName}</div>
// //       <div className="info-item"><strong>DOB:</strong> 10 June 1990</div>
// //       <div className="info-item"><strong>Gender:</strong> Male</div>
// //     </div>

// //     <div className="card">
// //       <h4>Company Details</h4>
// //       <div className="info-item"><strong>Role:</strong> {user.role}</div>
// //       <div className="info-item"><strong>Department:</strong> {user.department}</div>
// //       <div className="info-item"><strong>Joined:</strong> {user.joined}</div>
// //     </div>

// //     <div className="card">
// //       <h4>Leave Summary</h4>
// //       <div className="leave-item"><strong>Privilege:</strong> 6</div>
// //       <div className="leave-item"><strong>Casual:</strong> 3</div>
// //       <div className="leave-item"><strong>Sick:</strong> 2</div>
// //       <div className="leave-item"><strong>Pending:</strong> 1</div>
// //     </div>

// //     <div className="card">
// //       <h4>Login Details</h4>
// //       <div className="info-item"><strong>Last Login:</strong> {user.lastLogin}</div>
// //       <div className="info-item"><strong>System IP:</strong> 192.168.1.101</div>
// //     </div>

// //     <div className="card">
// //       <h4>Work Location</h4>
// //       <div className="info-item"><strong>City:</strong> Mumbai</div>
// //       <div className="info-item"><strong>Office:</strong> HQ Tower, 3rd Floor</div>
// //     </div>
// //   </div>
// // </div>

// //     </div>
// //   );
// // };

// // export default UserProfile;
// import React, { useState } from "react";
// import "./UserProfile.css";

// const UserProfile = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
//     <div className="userprofile-container">
//       {/* Shared Top Header */}
//       <div className="top-header">
//         <div className="hamburger" onClick={toggleSidebar}>☰</div>
//         <h2>Employee Profile</h2>
//       </div>

//       {/* Content Section: Left + Right */}
//       <div className="profile-content">
//         {/* Sidebar (Left) */}
//         <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
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
//           <nav className="sidebar-nav">
//             <a href="#">Dashboard</a>
//             <a href="#">Profile</a>
//             <a href="#">Settings</a>
//           </nav>
//         </div>

//         {/* Right Cards */}
//         <div className="main-content">
//           <div className="card-grid">
//             <div className="card">
//               <h4>Account Details</h4>
//               <div className="info-item"><strong>Name:</strong> {user.fullName}</div>
//               <div className="info-item"><strong>DOB:</strong> 10 June 1990</div>
//               <div className="info-item"><strong>Gender:</strong> Male</div>
//             </div>

//             <div className="card">
//               <h4>Company Details</h4>
//               <div className="info-item"><strong>Role:</strong> {user.role}</div>
//               <div className="info-item"><strong>Department:</strong> {user.department}</div>
//               <div className="info-item"><strong>Joined:</strong> {user.joined}</div>
//             </div>

//             <div className="card">
//               <h4>Leave Summary</h4>
//               <div className="leave-item"><strong>Privilege:</strong> 6</div>
//               <div className="leave-item"><strong>Casual:</strong> 3</div>
//               <div className="leave-item"><strong>Sick:</strong> 2</div>
//               <div className="leave-item"><strong>Pending:</strong> 1</div>
//             </div>

//             <div className="card">
//               <h4>Login Details</h4>
//               <div className="info-item"><strong>Last Login:</strong> {user.lastLogin}</div>
//               <div className="info-item"><strong>System IP:</strong> 192.168.1.101</div>
//             </div>

//             <div className="card">
//               <h4>Work Location</h4>
//               <div className="info-item"><strong>City:</strong> Mumbai</div>
//               <div className="info-item"><strong>Office:</strong> HQ Tower, 3rd Floor</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default UserProfile;

import React from "react";
import "./UserProfile.css";

const UserProfile = () => {
  const user = {
    fullName: "Lavkush Singh",
    username: "lavkush",
    email: "lavkush@example.com",
    contact: "+91-9876543210",
    role: "Employee",
    department: "IT",
    joined: "2024-01-10",
    lastLogin: "2024-06-20 08:45",
    address: "Mumbai, India",
    avatar: "",
  };

  const defaultAvatar =
    "https://ui-avatars.com/api/?name=Lavkush+Singh&background=0D8ABC&color=fff&size=128";

  return (
    <div className="account-page">
      <h2 style={{ marginBottom: "20px", color: "#003B5C", textAlign: "center" }}>Employee Profile</h2>
      <div className="account-grid">
        {/* LEFT VERTICAL CARD */}
        <div className="profile-card vertical">
          <img
            src={user.avatar || defaultAvatar}
            alt="Profile"
            className="avatar-img"
          />
          <h3>{user.fullName}</h3>
          <p>@{user.username}</p>
          <p>{user.email}</p>
          <p>{user.contact}</p>
          <p>{user.address}</p>
        </div>

        {/* RIGHT GRID CARDS */}
        <div className="right-cards">
          <div className="card">
            <h4>Account Details</h4>
            <div className="info-item"><strong>Name:</strong> {user.fullName}</div>
            <div className="info-item"><strong>DOB:</strong> 10 June 1990</div>
            <div className="info-item"><strong>Gender:</strong> Male</div>
          </div>

          <div className="card">
            <h4>Company Details</h4>
            <div className="info-item"><strong>Role:</strong> {user.role}</div>
            <div className="info-item"><strong>Department:</strong> {user.department}</div>
            <div className="info-item"><strong>Joined:</strong> {user.joined}</div>
          </div>

          <div className="card">
            <h4>Leave Summary</h4>
            <div className="leave-item"><strong>Privilege Leaves:</strong> 6</div>
            <div className="leave-item"><strong>Casual Leaves:</strong> 3</div>
            <div className="leave-item"><strong>Sick Leaves:</strong> 2</div>
            <div className="leave-item"><strong>Pending Requests:</strong> 1</div>
          </div>

          <div className="card">
            <h4>Login Details</h4>
            <div className="info-item"><strong>Last Login:</strong> {user.lastLogin}</div>
            <div className="info-item"><strong>System IP:</strong> 192.168.1.101</div>
          </div>

          {/* Add more cards here to see scrolling */}
          <div className="card">
            <h4>Work Location</h4>
            <div className="info-item"><strong>City:</strong> Mumbai</div>
            <div className="info-item"><strong>Office:</strong> HQ Tower, 3rd Floor</div>
          </div>
          <div className="card">
            <h4>CLOCK IN & OUT TIME</h4>
            <div className="info-item"><strong>CLOCK IN:</strong> 11:30 AM</div>
            <div className="info-item"><strong>CLOCK OUT:</strong> 7:00 PM</div>
            <div className="info-item"><strong>REGULARIZATION TIME:</strong> 1:30 PM</div>

          </div>

          
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

