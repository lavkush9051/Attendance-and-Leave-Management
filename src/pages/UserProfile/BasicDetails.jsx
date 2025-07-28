import React, { useContext } from "react";
import "./BasicDetails.css";
import { AuthContext } from "../../context/AuthContext";

const BasicDetails = () => {
  const { employee } = useContext(AuthContext);

  // For safety, if employee is not loaded yet
  if (!employee) {
    return <div className="basic-details">Loading employee info...</div>;
  }

  return (
    <div className="basic-details">
      <div className="basic-details-grid">
        <div>
          <label>Full Name</label>
          <p>{employee.emp_name || "-"}</p>
        </div>
        <div>
          <label>Gender</label>
          <p>{employee.emp_gender || "-"}</p>
        </div>
        <div>
          <label>Date of Birth</label>
          <p>{employee.emp_dob || "-"}</p>
        </div>
        <div>
          <label>Marital Status</label>
          <p>{employee.emp_marital_status || "-"}</p>
        </div>
        <div>
          <label>Nationality</label>
          <p>{employee.emp_nationality || "-"}</p>
        </div>
        <div>
          <label>Employee ID</label>
          <p>{employee.emp_id || "-"}</p>
        </div>
        <div>
          <label>Designation</label>
          <p>{employee.emp_designation || "-"}</p>
        </div>
        <div>
          <label>Department</label>
          <p>{employee.emp_department || "-"}</p>
        </div>
        <div>
          <label>Phone</label>
          <p>+91 {employee.emp_contact || "-"}</p>
        </div>
        <div>
          <label>Email</label>
          <p>{employee.emp_email || "-"}</p>
        </div>
        <div>
          <label>Joining Date</label>
          <p>{employee.emp_joining_date || "-"}</p>
        </div>
        <div>
          <label>Address</label>
          <p>{employee.emp_address || "-"}</p>
        </div>
        <div>
          <label>PAN No</label>
          <p>{employee.emp_pan_no || "-"}</p>
        </div>
        <div>
          <label>Weekoff</label>
          <p>{employee.emp_weekoff || "-"}</p>
        </div>
        {/* <div>
          <label>L1 Manager</label>
          <p>{employee.emp_l1 || "-"}</p>
        </div>
        <div>
          <label>L2 Manager</label>
          <p>{employee.emp_l2 || "-"}</p>
        </div> */}
      </div>
    </div>
  );
};

export default BasicDetails;
