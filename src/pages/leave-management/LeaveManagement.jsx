import React, { useState } from "react";
import LeaveDashboard from "./LeaveDashboard";
import LeaveDetails from "./LeaveDetails";
import LeaveRequestForm from "./LeaveRequestForm";
import "./LeaveManagement.css";


const LeaveManagement = () => {
  const [showForm, setShowForm] = useState(false);
  
  const [leaveBalances] = useState([
    { type: "Privilege Leave", total: 12, taken: 3, remaining: 9 },
    { type: "Casual Leave", total: 8, taken: 2, remaining: 6 },
    { type: "Sick Leave", total: 10, taken: 1, remaining: 9 },
    { type: "Maternity Leave", total: 180, taken: 0, remaining: 180 }
  ]);

  const handleSubmit = (newRequest) => {
    // setLeaveRequests([...leaveRequests, {
    //   ...newRequest,
    //   status: "Pending",
    //   empId: `EMP${Math.floor(1000 + Math.random() * 9000)}`
    // }]);
    setShowForm(false);
  };

  return (
    <div className="leave-management-container">
      <div className="leave-header-wrapper">
        <h1>Leave Management</h1>
        <div className="form-actions">
          <button
            onClick={() => setShowForm(!showForm)}
            className="toggle-form-btn"
          >
            {showForm ? "Cancel" : "Apply for Leave"}
          </button>
        </div>
      </div>
      <LeaveDashboard/>

      <LeaveDetails leaveBalances={leaveBalances} />
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <LeaveRequestForm
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveManagement;