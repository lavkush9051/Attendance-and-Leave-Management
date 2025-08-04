import React, { useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ReportsTab() {
  const [empId, setEmpId] = useState(""); // or empName, as per your data
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [employees, setEmployees] = useState([]);

  // Optionally, fetch employee list for dropdown
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/employees`)
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  const handleDownload = () => {
    const params = new URLSearchParams({
      emp_id: empId,
      month,
      year
    });
    window.open(`${API_BASE_URL}/reports/attendance?${params}`, "_blank");
  };

  return (
    <div className="reports-tab">
      <h3>Attendance Reports</h3>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <select value={empId} onChange={e => setEmpId(e.target.value)}>
          <option value="">All Employees</option>
          {employees.map(emp => (
            <option key={emp.emp_id} value={emp.emp_id}>{emp.emp_name}</option>
          ))}
        </select>
        <select value={month} onChange={e => setMonth(e.target.value)}>
          {[...Array(12)].map((_, idx) => (
            <option key={idx + 1} value={idx + 1}>{idx + 1}</option>
          ))}
        </select>
        <select value={year} onChange={e => setYear(e.target.value)}>
          {[2024, 2025, 2026].map(yr => (
            <option key={yr} value={yr}>{yr}</option>
          ))}
        </select>
        <button onClick={handleDownload}>Download Excel</button>
      </div>
    </div>
  );
}

export default ReportsTab;
