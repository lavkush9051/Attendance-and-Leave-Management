import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./ReportingLevel.css";

export default function ReportingLevel() {
  const [levels, setLevels] = useState(null);
  const [modalUser, setModalUser] = useState(null);

  useEffect(() => {
    // Fetch emp_id, emp_l1, emp_l2 from localStorage after login
    const employee = JSON.parse(localStorage.getItem("employee"));
    if (!employee) return;
    const { emp_id, emp_l1, emp_l2 } = employee;
    fetch(`http://127.0.0.1:8000/api/reporting-levels?emp_id=${emp_id}&l1_id=${emp_l1}&l2_id=${emp_l2}`)
      .then(res => res.json())
      .then(data => setLevels([data.employee, data.l1, data.l2]));
  }, []);

  if (!levels) return <div>Loading reporting levels...</div>;

  return (
    <div className="reporting-container">
      <h2 className="reporting-title">Reporting Hierarchy</h2>
      <div className="reporting-stack">
        {levels.map((user, idx) => (
          <React.Fragment key={user.name}>
            <UserCard
              user={user}
              showModal={idx > 0}
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
        <div className="user-role">{user.designation}</div>
      </div>
      {showDetails && <ManagerDetailsModal user={user} />}
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
        <div className="modal-role">{user.designation}</div>
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
      <span className="simple-down-arrow">↓</span>
    </div>
  );
}
