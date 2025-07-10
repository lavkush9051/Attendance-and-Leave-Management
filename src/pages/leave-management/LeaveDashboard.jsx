import React, { useState } from "react";
import "./LeaveDashboard.css";

const LeaveDashboard = ({ leaveRequests, setLeaveRequests }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const renderManagerLevels = (status) => {
    return (
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
  };
  const handleRevoke = (empId) => {
    const confirmDelete = window.confirm("Are you sure you want to revoke this leave request?");
    if (confirmDelete) {
      const updatedRequests = leaveRequests.filter((req) => req.empId !== empId);
      setLeaveRequests(updatedRequests);
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
              <React.Fragment key={request.empId}>
                {expandedRow === index && (
                  <tr className="manager-row">
                    <td colSpan="8">{renderManagerLevels(request.status)}</td>
                  </tr>
                )}
                <tr
                  className="table-data-row"
                  onClick={() => toggleRow(index)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{request.empId}</td>
                  <td>{request.name}</td>
                  <td>{request.department}</td>
                  <td>{request.leaveType}</td>
                  <td>{request.fromDate}</td>
                  <td>{request.toDate}</td>
                  <td>{request.reason}</td>
                  <td>
                    <span className={`status-badge ${request.status.toLowerCase()}`}>
                      {request.status}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    {request.status === "Pending" && (
                      <button
                        className="revoke-btn"
                        onClick={() => handleRevoke(request.empId)}
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
