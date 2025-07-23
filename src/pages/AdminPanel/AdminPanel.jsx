import React, { useState } from "react";
import "./AdminPanel.css";
import ShiftManagement from "./ShiftManagement";
import { useLeaveRequests } from "../../context/LeaveRequestsContext";
import { useAttendanceRequests } from "../../context/AttendanceRequestsContext";

const AdminPanel = () => {
  const [tab, setTab] = useState("leave");
  const [managerRole, setManagerRole] = useState("L1");
  const { leaveRequests, setLeaveRequests } = useLeaveRequests();
  const { attendanceRequests, setAttendanceRequests } = useAttendanceRequests();

  // Workflow filtering for leave requests
  const filteredLeaveRequests = leaveRequests.filter(req => {
    if (managerRole === "L1") return req.status === "Pending";
    if (managerRole === "L2") return req.status === "L1 Approved";
    return false;
  });

  // Workflow filtering for attendance requests
  const filteredAttendanceRequests = attendanceRequests.filter(req => {
    if (managerRole === "L1") return req.status === "Pending";
    if (managerRole === "L2") return req.status === "L1 Approved";
    return false;
  });

  // Approve/Reject Leave according to workflow
  const handleLeaveStatus = (empId, action) => {
    setLeaveRequests(prev =>
      prev.map(req => {
        if (req.empId !== empId) return req;
        if (managerRole === "L1" && action === "approve") return { ...req, status: "L1 Approved" };
        if (managerRole === "L1" && action === "reject") return { ...req, status: "Rejected" };
        if (managerRole === "L2" && action === "approve") return { ...req, status: "Approved" };
        if (managerRole === "L2" && action === "reject") return { ...req, status: "Rejected" };
        return req;
      })
    );
  };

  // Approve/Reject Attendance according to workflow
  const handleAttendanceStatus = (reqId, action) => {
    setAttendanceRequests(prev =>
      prev.map(req => {
        if (req.id !== reqId) return req;
        if (managerRole === "L1" && action === "approve") return { ...req, status: "L1 Approved" };
        if (managerRole === "L1" && action === "reject") return { ...req, status: "Rejected" };
        if (managerRole === "L2" && action === "approve") return { ...req, status: "Approved" };
        if (managerRole === "L2" && action === "reject") return { ...req, status: "Rejected" };
        return req;
      })
    );
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

      {tab === "leave" && (
        <RequestsTable
          data={filteredLeaveRequests}
          type="Leave"
          onStatusChange={handleLeaveStatus}
          managerRole={managerRole}
        />
      )}
      {tab === "attendance" && (
        <RequestsTable
          data={filteredAttendanceRequests}
          type="Attendance"
          onStatusChange={handleAttendanceStatus}
          managerRole={managerRole}
        />
      )}
      {tab === "shift" && <ShiftManagement />}
    </div>
  );
};

// RequestsTable with workflow buttons
const RequestsTable = ({ data, type, onStatusChange, managerRole }) => (
  <div className="requests-table">
    <h3>{type} Requests ({managerRole})</h3>
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
        {data.length === 0 && (
          <tr><td colSpan={type === "Leave" ? 7 : 8} style={{ textAlign: "center" }}>No requests</td></tr>
        )}
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
              {/* Approve/Reject Buttons: only show for pending/l1 approved */}
              {type === "Leave" || type === "Attendance" ? (
                <>
                  <button
                    className="approve-btn"
                    onClick={() => onStatusChange(req.empId || req.id, "approve")}
                    disabled={
                      (managerRole === "L1" && req.status !== "Pending") ||
                      (managerRole === "L2" && req.status !== "L1 Approved") ||
                      req.status === "Approved" || req.status === "Rejected"
                    }
                  >
                    Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => onStatusChange(req.empId || req.id, "reject")}
                    disabled={
                      (managerRole === "L1" && req.status !== "Pending") ||
                      (managerRole === "L2" && req.status !== "L1 Approved") ||
                      req.status === "Approved" || req.status === "Rejected"
                    }
                  >
                    Reject
                  </button>
                </>
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminPanel;
