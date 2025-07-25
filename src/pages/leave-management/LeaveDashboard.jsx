import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import "./LeaveDashboard.css";

const LeaveDashboard = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const { employee } = useContext(AuthContext); // Get logged-in employee

  // Fetch leave requests for this employee on mount
  useEffect(() => {
    //if (!employee) return;
    fetch(`http://127.0.0.1:8000/api/leave-requests/10001`)//{emp_id}
      .then(res => res.json())
      .then(data => setLeaveRequests(data))
      .catch(err => setLeaveRequests([]));
  }, [employee]);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const renderManagerLevels = (status) => (
    <div className="manager-tracker-wrapper glass-effect">
      <div className={`manager-level ${status === "Approved" ? "approved" : status === "Rejected" ? "rejected" : "pending"}`}>
        <strong>L2 Manager:</strong>{" "}
        <span className={`manager-status-pill ${status === "Approved"
            ? "approved"
            : status === "Rejected"
              ? "rejected"
              : "pending"
          }`}></span>
        {status === "Approved"
          ? "Approved"
          : status === "Rejected"
            ? "Not Applicable"
            : "Pending"}
      </div>
      <div className="arrow-up">↑</div>
      <div className={`manager-level ${status === "Rejected" ? "rejected" : "approved"}`}>
        <strong>L1 Manager:</strong> {status === "Rejected" ? "Rejected" : "Approved"}
      </div>
      <div className="arrow-up">↑</div>
    </div>
  );

  const handleRevoke = (leave_req_id) => {
    const confirmDelete = window.confirm("Are you sure you want to revoke this leave request?");
    if (confirmDelete) {
      fetch(`http://127.0.0.1:8000/api/leave-requests/${leave_req_id}`, {
        method: 'DELETE'
      }).then(() => {
        setLeaveRequests(prev => prev.filter(req => req.leave_req_id !== leave_req_id));
      });
    }
  };

  return (
    <div className="leave-dashboard-container">
      <h2 className="dashboard-title">Leave Status</h2>
      <div className="dashboard-table-container">
        <table className="dashboard-table">
          <thead>
            <tr className="table-header-row">
              <th>Emp ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Leave Type</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Revoke</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request, index) => (
              <React.Fragment key={request.leave_req_id}>
                {expandedRow === index && (
                  <tr className="manager-row">
                    <td colSpan="9">{renderManagerLevels(request.leave_req_status)}</td>
                  </tr>
                )}
                <tr
                  className="table-data-row"
                  onClick={() => toggleRow(index)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{request.leave_req_emp_id}</td>
                  <td>{request.emp_name}</td>
                  <td>{request.emp_department}</td>
                  <td>{request.leave_req_type}</td>
                  <td>{request.leave_req_from_dt}</td>
                  <td>{request.leave_req_to_dt}</td>
                  <td>{request.leave_req_reason}</td>
                  <td>
                    <span className={`status-badge ${request.leave_req_status.toLowerCase()}`}>
                      {request.leave_req_status}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    {request.leave_req_status === "Pending" && (
                      <button
                        className="revoke-btn"
                        onClick={() => handleRevoke(request.leave_req_id)}
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveDashboard;
