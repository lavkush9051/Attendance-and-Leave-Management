import React, { useState } from "react";
import LeaveDashboard from "./LeaveDashboard";
import LeaveDetails from "./LeaveDetails";
import LeaveRequestForm from "./LeaveRequestForm";
import "./LeaveManagement.css";
import {useLeaveRequests } from "../../context/LeaveRequestsContext";

const LeaveManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const {leaveRequests, setLeaveRequests} = useLeaveRequests();
  //   [
  //   {
  //     empId: "EMP001",
  //     name: "Sandeep pal",
  //     department: "IT",
  //     leaveType: "Privilege Leave",
  //     fromDate: "2025-06-10",
  //     toDate: "2025-06-12",
  //     reason: "Family function",
  //     status: "Approved"
  //   },
  //   {
  //     empId: "EMP999",
  //     name: "Anita Sharma",
  //     department: "Finance",
  //     leaveType: "Sick Leave",
  //     fromDate: "2025-06-18",
  //     toDate: "2025-06-20",
  //     reason: "Medical leave not supported with documents",
  //     status: "Rejected"
  //   }

  //   // More sample data...
  // ]);

  const [leaveBalances] = useState([
    { type: "Privilege Leave", total: 12, taken: 3, remaining: 9 },
    { type: "Casual Leave", total: 8, taken: 2, remaining: 6 },
    { type: "Sick Leave", total: 10, taken: 1, remaining: 9 },
    { type: "Maternity Leave", total: 180, taken: 0, remaining: 180 }
  ]);

  const handleSubmit = (newRequest) => {
    setLeaveRequests([...leaveRequests, {
      ...newRequest,
      status: "Pending",
      empId: `EMP${Math.floor(1000 + Math.random() * 9000)}`
    }]);
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
      <LeaveDashboard
        leaveRequests={leaveRequests}
        setLeaveRequests={setLeaveRequests}
      />

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