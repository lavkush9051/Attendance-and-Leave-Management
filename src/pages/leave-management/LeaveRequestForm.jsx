import React, { useState } from "react";
import "./LeaveRequestForms.css";

const LeaveRequestForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    empId: "",
    name: "",
    department: "",
    leaveType: "Privilege Leave",
    fromDate: "",
    toDate: "",
    reason: "",
    customReason: ""
  });

  const [showCustomReason, setShowCustomReason] = useState(false);
  const [evidenceFile, setEvidenceFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if evidence is mandatory and not uploaded
    if (formData.leaveType === "Medical Leave" && !evidenceFile) {
      setFileError("Evidence is required for Medical Leave.");
      return;
    }

    const finalReason = showCustomReason ? formData.customReason : formData.reason;

    onSubmit({
      ...formData,
      empId: `EMP${Math.floor(1000 + Math.random() * 9000)}`,
      reason: finalReason,
      status: "Pending",
      evidence: evidenceFile ? evidenceFile.name : null
    });

    // Reset form after submit
    setEvidenceFile(null);
    setFileError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "reason") {
      setShowCustomReason(value === "Others");
    }

    if (name === "leaveType" && value !== "Medical Leave") {
      setFileError(""); // clear error if changed from medical
    }

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
            <label>Employee ID</label>
            <input
              type="text"
              name="empId"
              value={formData.empId}
              onChange={handleChange}
              placeholder="EMP001"
              required
            />
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="IT"
              required
            />
          </div>

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

          {/* Reason */}
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

        {/* Upload Evidence */}
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

        {/* Buttons */}
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>

          <button type="submit" className="submit-btn">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
