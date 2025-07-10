import React, { useState } from "react";
import { useAttendanceRequests } from "../../context/AttendanceRequestsContext";
import "./RegularizeAttendanceModal.css";

const todayStr = new Date().toISOString().slice(0,10);

export default function RegularizeAttendanceModal({ open, onClose, user }) {
  const [form, setForm] = useState({
    date: todayStr,
    clockIn: "",
    clockOut: "",
    reason: "",
  });
  const { setAttendanceRequests } = useAttendanceRequests();

  if (!open) return null;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setAttendanceRequests(prev => [
      ...prev,
      {
        id: Date.now(),
        name: user?.name || "Current User",
        date: form.date,
        clockIn: form.clockIn,
        clockOut: form.clockOut,
        reason: form.reason,
        status: "Pending"
      }
    ]);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content regularize-modal">
        <h2>Regularize Attendance</h2>
        <form onSubmit={handleSubmit} className="regularize-form">
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Clock In Time:
            <input
              type="time"
              name="clockIn"
              value={form.clockIn}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Clock Out Time:
            <input
              type="time"
              name="clockOut"
              value={form.clockOut}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Reason:
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              required
            />
          </label>
          <div className="modal-actions">
            <button type="button" className="modal-cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="modal-submit-btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
