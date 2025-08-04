import React, { useState, useEffect } from "react";
import LeaveDashboard from "./LeaveDashboard";
import LeaveDetails from "./LeaveDetails";
import LeaveRequestForm from "./LeaveRequestForm";
import "./LeaveManagement.css";
import { API_BASE_URL } from "../../config";


const LeaveManagement = () => {
  const [showForm, setShowForm] = useState(false);
  
  // const [leaveBalances] = useState([
  //   { type: "Privilege Leave", total: 12, taken: 3, remaining: 9 },
  //   { type: "Casual Leave", total: 8, taken: 2, remaining: 6 },
  //   { type: "Sick Leave", total: 10, taken: 1, remaining: 9 },
  //   { type: "Maternity Leave", total: 180, taken: 0, remaining: 180 }
  // ]);

  const [leaveBalances, setLeaveBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  //"http://127.0.0.1:8000/api/leave-types"
  useEffect(() => {
      // Fetch leave types from backend
      fetch(`${API_BASE_URL}/api/leave-types`)
        .then(res => res.json())
        .then(data => {
          // Backend should return: { leave_types: [{ type, abrev, total }] }
          setLeaveBalances(
            data.leave_types.map(l => ({
              type: l.type,
              abrev: l.abrev,
              total: l.total,
              taken: 0, // Set logic for taken/remaining if you have it
              remaining: l.total, // Set your own calculation here if needed
            }))
          );
          setLoading(false);
        });
    }, []);

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

      {loading ? (
        <div>Loading leave types...</div>
      ) : (
        <LeaveDetails leaveBalances={leaveBalances} />
      )}
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