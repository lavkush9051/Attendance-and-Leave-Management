import React, { useState, useEffect, useContext } from "react";
import "./AdminPanel.css";
import ShiftManagement from "./ShiftManagement";
import { AuthContext } from "../../context/AuthContext";

// Main AdminPanel component
const AdminPanel = () => {
  const [tab, setTab] = useState("leave");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [attendanceRequests, setAttendanceRequests] = useState([]);
  const { employee } = useContext(AuthContext);

  // Fetch leave requests
  useEffect(() => {
    if (!employee?.emp_id) return;
    fetch(`http://127.0.0.1:8000/api/leave-requests?admin_id=${employee.emp_id}`)
      .then(res => res.json())
      .then(data => setLeaveRequests(data))
      .catch(err => console.error("Failed to fetch leave requests", err));
  }, [employee]);

  // Fetch attendance requests
  useEffect(() => {
    if (!employee?.emp_id) return;
    fetch(`http://127.0.0.1:8000/api/attendance-requests?admin_id=${employee.emp_id}`)
      .then(res => res.json())
      .then(data => setAttendanceRequests(data))
      .catch(err => console.error("Failed to fetch attendance requests", err));
  }, [employee]);

  // Approve/Reject Leave
  const handleLeaveStatus = async (leave_req_id, action) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/leave-request/action", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leave_req_id, action, admin_id: employee.emp_id }),
      });
      const result = await res.json();
      if (result.status === "success") {
        // Refetch leave requests
        fetch(`http://127.0.0.1:8000/api/leave-requests?admin_id=${employee.emp_id}`)
          .then(res => res.json())
          .then(data => setLeaveRequests(data));
      } else {
        alert("Update failed: " + (result.error || ""));
      }
    } catch (err) {
      alert("API error: " + err);
    }
  };

  // Approve/Reject Attendance
  const handleAttendanceStatus = async (art_id, action) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/attendance-request/action", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ art_id, action, admin_id: employee.emp_id }),
      });
      const result = await res.json();
      if (result.status === "success") {
        fetch(`http://127.0.0.1:8000/api/attendance-requests?admin_id=${employee.emp_id}`)
          .then(res => res.json())
          .then(data => setAttendanceRequests(data));
      } else {
        alert("Update failed: " + (result.error || ""));
      }
    } catch (err) {
      alert("API error: " + err);
    }
  };

  return (
    <div className="admin-panel-container">
      <h2>Admin Panel</h2>

      <div className="admin-tabs">
        <button className={tab === "leave" ? "active" : ""} onClick={() => setTab("leave")}>Leave Requests</button>
        <button className={tab === "attendance" ? "active" : ""} onClick={() => setTab("attendance")}>Attendance Requests</button>
        <button className={tab === "shift" ? "active" : ""} onClick={() => setTab("shift")}>Shift Management</button>
      </div>

      {tab === "leave" && (
        <LeaveRequestsTable
          data={leaveRequests}
          onStatusChange={handleLeaveStatus}
        />
      )}
      {tab === "attendance" && (
        <AttendanceRequestsTable
          data={attendanceRequests}
          onStatusChange={handleAttendanceStatus}
        />
      )}
      {tab === "shift" && <ShiftManagement />}
    </div>
  );
};

// Leave Requests Table
const LeaveRequestsTable = ({ data, onStatusChange }) => (
  <div className="requests-table">
    <h3>Leave Requests</h3>
    <table>
      <thead>
        <tr>
          <th>Employee</th>
          <th>Type</th>
          <th>From</th>
          <th>To</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 && (
          <tr><td colSpan={6} style={{ textAlign: "center" }}>No requests</td></tr>
        )}
        {data.map(req => (
          <tr key={req.leave_req_id}>
            <td>{req.emp_name}</td>
            <td>{req.leave_req_type}</td>
            <td>{req.leave_req_from_dt}</td>
            <td>{req.leave_req_to_dt}</td>
            <td>
              <span className={`pending ${req.leave_req_status && req.leave_req_status.toLowerCase()}`}>
                {req.leave_req_status}
              </span>
            </td>
            <td>
              <button
                className="approve-btn"
                onClick={() => onStatusChange(req.leave_req_id, "approve")}
                disabled={req.leave_req_status === "Approved" || req.leave_req_status === "Rejected"}
              >
                Approve
              </button>
              <button
                className="reject-btn"
                onClick={() => onStatusChange(req.leave_req_id, "reject")}
                disabled={req.leave_req_status === "Approved" || req.leave_req_status === "Rejected"}
              >
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Attendance Requests Table
const AttendanceRequestsTable = ({ data, onStatusChange }) => (
  <div className="requests-table">
    <h3>Attendance Requests</h3>
    <table>
      <thead>
        <tr>
          <th>Employee</th>
          <th>Date</th>
          <th>Clock In</th>
          <th>Clock Out</th>
          <th>Reason</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 && (
          <tr><td colSpan={7} style={{ textAlign: "center" }}>No requests</td></tr>
        )}
        {data.map(req => (
          <tr key={req.art_id}>
            <td>{req.emp_name}</td>
            <td>{req.art_date}</td>
            <td>{req.art_clockIn_time}</td>
            <td>{req.art_clockOut_time}</td>
            <td>{req.art_reason}</td>
            <td>
              <span className={`pending ${req.art_status && req.art_status.toLowerCase()}`}>
                {req.art_status}
              </span>
            </td>
            <td>
              <button
                className="approve-btn"
                onClick={() => onStatusChange(req.art_id, "approve")}
                disabled={req.art_status === "Approved" || req.art_status === "Rejected"}
              >
                Approve
              </button>
              <button
                className="reject-btn"
                onClick={() => onStatusChange(req.art_id, "reject")}
                disabled={req.art_status === "Approved" || req.art_status === "Rejected"}
              >
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminPanel;
