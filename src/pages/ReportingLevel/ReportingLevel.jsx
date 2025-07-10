import React, { useState } from "react";
import { FaUserCircle, FaArrowDown } from "react-icons/fa";
import "./ReportingLevel.css";

// Replace with your actual data fetching logic
const employee = {
  name: "Aditi Gupta",
  role: "Employee",
  email: "aditi@company.com",
  mobile: "9876543210",
  avatarColor: "#4F8CFD"
};
const L1 = {
  name: "Rakesh Kumar",
  role: "L1 Manager",
  email: "rakesh.k@company.com",
  mobile: "9555000111",
  department: "IT",
  avatarColor: "#FFA548"
};
const L2 = {
  name: "Swati Verma",
  role: "L2 Manager",
  email: "swati.verma@company.com",
  mobile: "9888800445",
  department: "HR",
  avatarColor: "#53D18A"
};

const levels = [employee, L1, L2];

export default function ReportingLevel() {
  // Track which card is hovered for modal
  const [modalUser, setModalUser] = useState(null);
  return (
    <div className="reporting-container">
      <h2 className="reporting-title">Reporting Hierarchy</h2>
      <div className="reporting-stack">
        {levels.map((user, idx) => (
          <React.Fragment key={user.name}>
            <UserCard
              user={user}
              showModal={idx > 0} // Only L1, L2, etc (not employee)
              onHover={() => setModalUser(idx)}
              onLeave={() => setModalUser(null)}
              showDetails={modalUser === idx}
            />
            {idx < levels.length - 1 && <AnimatedArrow />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function UserCard({ user, showModal, onHover, onLeave, showDetails }) {
  return (
    <div
      className="user-card"
      onMouseEnter={showModal ? onHover : undefined}
      onMouseLeave={showModal ? onLeave : undefined}
      style={{ position: "relative" }}
    >
      <div className="avatar" style={{ background: user.avatarColor }}>
        <FaUserCircle size={48} />
      </div>
      <div>
        <div className="user-name">{user.name}</div>
        <div className="user-role">{user.role}</div>
      </div>
      {/* Modal shown on hover */}
      {showDetails && (
        <ManagerDetailsModal user={user} />
      )}
    </div>
  );
}

function ManagerDetailsModal({ user }) {
  return (
    <div className="manager-modal">
      <div className="modal-avatar" style={{ background: user.avatarColor }}>
        <FaUserCircle size={42} />
      </div>
      <div className="modal-content-box">
        <div className="modal-title">{user.name}</div>
        <div className="modal-role">{user.role}</div>
        {user.department && (
          <div className="modal-detail"><strong>Department:</strong> {user.department}</div>
        )}
        <div className="modal-detail"><strong>Email:</strong> {user.email}</div>
        <div className="modal-detail"><strong>Mobile:</strong> {user.mobile}</div>
      </div>
    </div>
  );
}

function AnimatedArrow() {
  return (
    <div className="arrow-container">
      {/* <FaArrowDown className="animated-arrow" size={36} /> */}
      <span className="simple-down-arrow">↓</span>
    </div>
  );
}
