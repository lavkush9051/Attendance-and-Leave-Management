import React, { useState } from 'react';

export default function SalarySlip() {
  const [month, setMonth] = useState("June");
  const [year, setYear] = useState("2025");

  const handleDownload = () => {
    window.open('/SalarySlip.pdf', '_blank');
  };

  return (
    <div>
      <h3>Download Salary Slip</h3>
      <div className="salary-filter">
        <select value={month} onChange={e => setMonth(e.target.value)}>
          {["January","February","March","April","May","June","July","August","September","October","November","December"]
            .map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select value={year} onChange={e => setYear(e.target.value)}>
          {["2023","2024","2025"].map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <button onClick={handleDownload}>Download PDF</button>
      </div>
    </div>
  );
}
