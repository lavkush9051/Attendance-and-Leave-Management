import React, { useState, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import "./LeaveRequestForms.css";
import { API_BASE_URL } from "../../config";

const LeaveRequestForm = ({ onSubmit, onCancel }) => {
  const { employee } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    leaveType: "Privilege Leave",
    fromDate: "",
    toDate: "",
    reason: "",
    customReason: ""
  });

  const [showCustomReason, setShowCustomReason] = useState(false);
  const [evidenceFile, setEvidenceFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.leaveType === "Medical Leave" && !evidenceFile) {
      setFileError("Evidence is required for Medical Leave.");
      return;
    }

    setSubmitting(true);

    const finalReason = showCustomReason ? formData.customReason : formData.reason;

    // Prepare FormData for file upload (multi-part)
    const data = new FormData();
    console.log(employee.emp_id);
    data.append("emp_id", employee.emp_id);
    data.append("leave_type", formData.leaveType);
    data.append("leave_from_dt", formData.fromDate);
    data.append("leave_to_dt", formData.toDate);
    data.append("leave_reason", finalReason);
    if (evidenceFile) data.append("evidence", evidenceFile);
//"http://127.0.0.1:8000/api/leave-request"
    // Send POST to backend
    try {
      const response = await fetch(`${API_BASE_URL}/api/leave-request`, {
        method: "POST",
        body: data
      });
      const result = await response.json();
      if (result.status === "success") {
        if (onSubmit) onSubmit(result); // callback if needed
        onCancel(); // close form
      } else {
        alert("Failed to submit leave request.");
      }
    } catch (error) {
      alert("Failed to submit: " + error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "reason") setShowCustomReason(value === "Others");
    if (name === "leaveType" && value !== "Medical Leave") setFileError("");

    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setEvidenceFile(e.target.files[0]);
    setFileError("");
  };

  const reasonOptions = [
    "Personal time off",
    "Education or personal development",
    "Bereavement",
    "Travel or vacation",
    "Personal or family events",
    "Family emergencies",
    "Others"
  ];

  const medicalReasonOptions = [
    "Doctor Appointment",
    "Medical Treatment",
    "Recovery Time",
    "Others"
  ];

  return (
    <div className="leave-request-container">
      <h2 className="form-title">Apply for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Leave Type</label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              required
            >
              <option value="Privilege Leave">Privilege Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Medical Leave">Medical Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
            </select>
          </div>
          <div className="form-group">
            <label>From Date</label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>To Date</label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group full-width">
            <label>Reason</label>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Reason --</option>
              {(formData.leaveType === "Medical Leave"
                ? medicalReasonOptions
                : reasonOptions
              ).map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          {showCustomReason && (
            <div className="form-group full-width">
              <label>Please specify the reason</label>
              <textarea
                name="customReason"
                value={formData.customReason}
                onChange={handleChange}
                placeholder="Enter custom reason here..."
                rows="4"
                required
              />
            </div>
          )}
        </div>
        <div className="form-group full-width">
          <label>
            Upload Evidence{" "}
            <span style={{ color: "#d00000", fontWeight: "500" }}>*</span>{" "}
            <small>(Optional, but <strong>required for Medical Leave</strong>)</small>
          </label>
          <input type="file" onChange={handleFileChange} />
          {evidenceFile && (
            <p style={{ fontSize: "0.9rem", marginTop: "5px", color: "#003B5C" }}>
              Selected: {evidenceFile.name}
            </p>
          )}
          {fileError && (
            <p style={{ color: "red", fontSize: "0.9rem", marginTop: "5px" }}>{fileError}</p>
          )}
        </div>
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-btn" disabled={submitting}>
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
