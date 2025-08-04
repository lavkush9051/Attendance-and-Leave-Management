import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import "./LeaveDashboard.css";
import { API_BASE_URL } from "../../config";

// Manager status tracker logic with "Not Applicable" for L2 if L1 rejected
function renderManagerLevels(request) {
  const l1Status = request.leave_req_l1_status;
  const l2Status =
    l1Status === "Rejected"
      ? "Not Applicable"
      : request.leave_req_l2_status;

  return (
    <div className="manager-tracker-wrapper glass-effect">
      {/* L2 Manager */}
      <div
        className={`manager-level ${
          l1Status === "Rejected"
            ? "not-applicable"
            : l2Status === "Approved"
            ? "approved"
            : l2Status === "Rejected"
            ? "rejected"
            : "pending"
        }`}
      >
        <strong>L2 Manager:</strong>{" "}
        <span
          className={`manager-status-pill ${
            l1Status === "Rejected"
              ? "not-applicable"
              : l2Status === "Approved"
              ? "approved"
              : l2Status === "Rejected"
              ? "rejected"
              : "pending"
          }`}
        />
        {l1Status === "Rejected" ? "Not Applicable" : l2Status}
      </div>
      <div className="arrow-up">↑</div>
      {/* L1 Manager */}
      <div
        className={`manager-level ${
          l1Status === "Approved"
            ? "approved"
            : l1Status === "Rejected"
            ? "rejected"
            : "pending"
        }`}
      >
        <strong>L1 Manager:</strong>{" "}
        <span
          className={`manager-status-pill ${
            l1Status === "Approved"
              ? "approved"
              : l1Status === "Rejected"
              ? "rejected"
              : "pending"
          }`}
        />
        {l1Status}
      </div>
      <div className="arrow-up">↑</div>
    </div>
  );
}

const getStatus = (req) => {
  if (req.leave_req_l1_status === "Rejected" || req.leave_req_l2_status === "Rejected") {
    return "Rejected";
  }
  if (req.leave_req_l1_status === "Approved" && req.leave_req_l2_status === "Approved") {
    return "Approved";
  }
  return "Pending";
};

const getStatusClass = (req) => {
  if (req.leave_req_l1_status === "Rejected" || req.leave_req_l2_status === "Rejected") {
    return "rejected";
  }
  if (req.leave_req_l1_status === "Approved" && req.leave_req_l2_status === "Approved") {
    return "approved";
  }
  return "pending";
};

const LeaveDashboard = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const { employee } = useContext(AuthContext);

  useEffect(() => {
    if (!employee?.emp_id) return;
    fetch(`${API_BASE_URL}/api/leave-requests/${employee.emp_id}`) //    fetch(`http://127.0.0.1:8000/api/leave-requests/${employee.emp_id}`)

      .then(res => res.json())
      .then(data => setLeaveRequests(data))
      .catch(() => setLeaveRequests([]));
  }, [employee]);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleRevoke = (leave_req_id) => {
    const confirmDelete = window.confirm("Are you sure you want to revoke this leave request?");
    if (confirmDelete) {
      fetch(`${API_BASE_URL}/api/leave-requests/${leave_req_id}`, {
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
                    <td colSpan="9">{renderManagerLevels(request)}</td>
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
                    <span className={`status-badge ${getStatusClass(request)}`}>
                      {getStatus(request)}
                    </span>
                  </td>
                  <td onClick={e => e.stopPropagation()}>
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
