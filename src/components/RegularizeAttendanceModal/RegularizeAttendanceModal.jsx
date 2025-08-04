import React, { useState } from "react";
import "./RegularizeAttendanceModal.css";
import { API_BASE_URL } from "../../config";

const todayStr = new Date().toISOString().slice(0, 10);

export default function RegularizeAttendanceModal({ open, onClose }) {
  const [form, setForm] = useState({
    date: todayStr,
    clockIn: "",
    clockOut: "",
    reason: "",
  });
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Get emp_id from localStorage (as saved after login)
    const employee = JSON.parse(localStorage.getItem("employee"));
    const emp_id = employee?.emp_id;
    if (!emp_id) {
      alert("Employee ID missing. Please re-login.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/attendance-regularization`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emp_id,
          date: form.date,
          clock_in: form.clockIn,
          clock_out: form.clockOut,
          reason: form.reason,
        }),
      });
      const result = await response.json();
      if (result.status === "success") {
        onClose();
      } else {
        alert("Failed to submit attendance regularization.");
      }
    } catch (err) {
      alert("Error: " + err);
    } finally {
      setSubmitting(false);
    }
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
            <button type="button" className="modal-cancel-btn" onClick={onClose} disabled={submitting}>Cancel</button>
            <button type="submit" className="modal-submit-btn" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
