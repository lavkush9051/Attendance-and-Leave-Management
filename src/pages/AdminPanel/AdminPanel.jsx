import React, { useState } from "react";
import { employees, admins, shifts } from "./mockEmployees";
//import { attendanceRequests as initialAttendanceRequests } from "./mockRequests";
import "./AdminPanel.css";
import ShiftManagement from "./ShiftManagement";
import { useLeaveRequests } from "../../context/LeaveRequestsContext";
import { useAttendanceRequests } from "../../context/AttendanceRequestsContext"; // Import the context


const AdminPanel = () => {
  const [tab, setTab] = useState("leave");
  const { leaveRequests, setLeaveRequests } = useLeaveRequests();
  const { attendanceRequests, setAttendanceRequests } = useAttendanceRequests();


  // Approve/Reject Leave
  const handleLeaveStatus = (empId, newStatus) => {
    setLeaveRequests(prev =>
      prev.map(req =>
        req.empId === empId ? { ...req, status: newStatus } : req
      )
    );
  };

  // Approve/Reject Attendance
  const handleAttendanceStatus = (reqId, newStatus) => {
    setAttendanceRequests(prev =>
      prev.map(req =>
        req.id === reqId ? { ...req, status: newStatus } : req
      )
    );
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
        <RequestsTable
          data={leaveRequests}
          type="Leave"
          onStatusChange={handleLeaveStatus}
        />
      )}
      {tab === "attendance" && (
        <RequestsTable
          data={attendanceRequests}
          type="Attendance"
          onStatusChange={handleAttendanceStatus}
        />
      )}
      {tab === "shift" && <ShiftManagement />}
    </div>
  );
};

// RequestsTable Component (generic for both leave & attendance)
const RequestsTable = ({ data, type, onStatusChange }) => (
  <div className="requests-table">
    <h3>{type} Requests</h3>
    <table>
      <thead>
        <tr>
          <th>Employee</th>
          {type === "Leave" && (<><th>Type</th><th>From</th><th>To</th></>)}
          {type === "Attendance" && (<>
            <th>Date</th>
            <th>Clock In</th>
            <th>Clock Out</th>
            <th>Reason</th>
          </>)}
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map(req => (
          <tr key={req.empId || req.id}>
            <td>{req.name || req.employee}</td>
            {type === "Leave" && (<>
              <td>{req.leaveType || req.type}</td>
              <td>{req.fromDate || req.from}</td>
              <td>{req.toDate || req.to}</td>
            </>)}
            {type === "Attendance" && (<>
              <td>{req.date}</td>
              <td>{req.clockIn}</td>
              <td>{req.clockOut}</td>
              <td>{req.reason}</td>
            </>)}
            <td>
              <span className={`pending ${req.status && req.status.toLowerCase()}`}>
                {req.status}
              </span>
            </td>
            <td>
              <button
                className="approve-btn"
                onClick={() => onStatusChange(req.empId || req.id, "Approved")}
                disabled={req.status === "Approved"}
              >Approve</button>
              <button
                className="reject-btn"
                onClick={() => onStatusChange(req.empId || req.id, "Rejected")}
                disabled={req.status === "Rejected"}
              >Reject</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminPanel;
