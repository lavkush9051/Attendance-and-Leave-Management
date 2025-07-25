import React, { useState, useEffect } from "react";
import "./AdminPanel.css";
import ShiftManagement from "./ShiftManagement";

// Main AdminPanel component
const AdminPanel = () => {
  const [tab, setTab] = useState("leave");
  const [managerRole, setManagerRole] = useState("L1");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [attendanceRequests, setAttendanceRequests] = useState([]);

  // Fetch leave requests
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/leave-requests")
      .then(res => res.json())
      .then(data => setLeaveRequests(data))
      .catch(err => console.error("Failed to fetch leave requests", err));
  }, []);

  // Fetch attendance requests
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/attendance-requests")
      .then(res => res.json())
      .then(data => setAttendanceRequests(data))
      .catch(err => console.error("Failed to fetch attendance requests", err));
  }, []);

  // Filtering logic for leave requests
  const filteredLeaveRequests = leaveRequests.filter(req => {
    if (managerRole === "L1") return req.leave_req_status === "Pending";
    if (managerRole === "L2") return req.leave_req_status === "L1 Approved";
    return false;
  });

  // Filtering logic for attendance requests
  const filteredAttendanceRequests = attendanceRequests.filter(req => {
    if (managerRole === "L1") return req.art_status === "Pending";
    if (managerRole === "L2") return req.art_status === "L1 Approved";
    return false;
  });

  // Approve/Reject Leave
  const handleLeaveStatus = async (leave_req_id, action) => {
    const endpoint =
      managerRole === "L1"
        ? "http://127.0.0.1:8000/api/leave-request/l1-action"
        : "http://127.0.0.1:8000/api/leave-request/l2-action";
    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leave_req_id, action }),
      });
      const result = await res.json();
      if (result.status === "success") {
        // Refetch leave requests
        fetch("http://127.0.0.1:8000/api/leave-requests")
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
    const endpoint =
      managerRole === "L1"
        ? "http://127.0.0.1:8000/api/attendance-request/l1-action"
        : "http://127.0.0.1:8000/api/attendance-request/l2-action";
    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ art_id, action }),
      });
      const result = await res.json();
      if (result.status === "success") {
        // Refetch attendance requests
        fetch("http://127.0.0.1:8000/api/attendance-requests")
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
      <div className="role-toggle-segmented">
        <input
          type="radio"
          id="role-l1"
          name="managerRole"
          checked={managerRole === "L1"}
          onChange={() => setManagerRole("L1")}
          hidden
        />
        <label htmlFor="role-l1" className={managerRole === "L1" ? "selected" : ""}>
          <span>L1 Manager</span>
        </label>
        <input
          type="radio"
          id="role-l2"
          name="managerRole"
          checked={managerRole === "L2"}
          onChange={() => setManagerRole("L2")}
          hidden
        />
        <label htmlFor="role-l2" className={managerRole === "L2" ? "selected" : ""}>
          <span>L2 Manager</span>
        </label>
      </div>

      <div className="admin-tabs">
        <button className={tab === "leave" ? "active" : ""} onClick={() => setTab("leave")}>Leave Requests</button>
        <button className={tab === "attendance" ? "active" : ""} onClick={() => setTab("attendance")}>Attendance Requests</button>
        <button className={tab === "shift" ? "active" : ""} onClick={() => setTab("shift")}>Shift Management</button>
      </div>

      {/* Tab Content */}
      {tab === "leave" && (
        <LeaveRequestsTable
          data={filteredLeaveRequests}
          onStatusChange={handleLeaveStatus}
          managerRole={managerRole}
        />
      )}
      {tab === "attendance" && (
        <AttendanceRequestsTable
          data={filteredAttendanceRequests}
          onStatusChange={handleAttendanceStatus}
          managerRole={managerRole}
        />
      )}
      {tab === "shift" && <ShiftManagement />}
    </div>
  );
};

// Leave Requests Table
const LeaveRequestsTable = ({ data, onStatusChange, managerRole }) => (
  <div className="requests-table">
    <h3>Leave Requests ({managerRole})</h3>
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
                disabled={
                  (managerRole === "L1" && req.leave_req_status !== "Pending") ||
                  (managerRole === "L2" && req.leave_req_status !== "L1 Approved") ||
                  req.leave_req_status === "Approved" || req.leave_req_status === "Rejected"
                }
              >
                Approve
              </button>
              <button
                className="reject-btn"
                onClick={() => onStatusChange(req.leave_req_id, "reject")}
                disabled={
                  (managerRole === "L1" && req.leave_req_status !== "Pending") ||
                  (managerRole === "L2" && req.leave_req_status !== "L1 Approved") ||
                  req.leave_req_status === "Approved" || req.leave_req_status === "Rejected"
                }
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
const AttendanceRequestsTable = ({ data, onStatusChange, managerRole }) => (
  <div className="requests-table">
    <h3>Attendance Requests ({managerRole})</h3>
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
                disabled={
                  (managerRole === "L1" && req.art_status !== "Pending") ||
                  (managerRole === "L2" && req.art_status !== "L1 Approved") ||
                  req.art_status === "Approved" || req.art_status === "Rejected"
                }
              >
                Approve
              </button>
              <button
                className="reject-btn"
                onClick={() => onStatusChange(req.art_id, "reject")}
                disabled={
                  (managerRole === "L1" && req.art_status !== "Pending") ||
                  (managerRole === "L2" && req.art_status !== "L1 Approved") ||
                  req.art_status === "Approved" || req.art_status === "Rejected"
                }
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
