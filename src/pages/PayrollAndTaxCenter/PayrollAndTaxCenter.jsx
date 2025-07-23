import React, { useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip as PieTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as BarTooltip,
} from "recharts";
import "./PayrollAndTaxCenter.css";

const TABS = ["Salary Slip", "PF Balance", "Tax Info", "Tax Declaration"];
const months = [
  { value: "01", label: "January" }, { value: "02", label: "February" }, { value: "03", label: "March" },
  { value: "04", label: "April" }, { value: "05", label: "May" }, { value: "06", label: "June" },
  { value: "07", label: "July" }, { value: "08", label: "August" }, { value: "09", label: "September" },
  { value: "10", label: "October" }, { value: "11", label: "November" }, { value: "12", label: "December" },
];
const COLORS = ["#3578e5", "#a3bffa", "#f6ad55", "#48bb78", "#f56565", "#805ad5", "#facc15"];

const demoSalaryData = {
  "2025-06": {
    name: "Lavkush Singh",
    empId: "EMP0123",
    basic: 35000,
    hra: 12000,
    pf: 4200,
    tax: 3000,
    gross: 55000,
    net: 52000,
    bonus: 800,
    specialAllowance: 2000,
    others: 1000,
  },
  "2025-05": {
    name: "Lavkush Singh",
    empId: "EMP0123",
    basic: 35000,
    hra: 12000,
    pf: 4200,
    tax: 3000,
    gross: 55000,
    net: 52000,
    bonus: 500,
    specialAllowance: 1500,
    others: 800,
  },
  "2025-04": {
    name: "Lavkush Singh",
    empId: "EMP0123",
    basic: 34000,
    hra: 11000,
    pf: 4100,
    tax: 2950,
    gross: 54000,
    net: 50950,
    bonus: 400,
    specialAllowance: 1300,
    others: 600,
  },
};

function downloadPDF(data) {
  const pdfContent = `
    Salary Slip - ${data.month} ${data.year}

    Name: ${data.name}
    Employee ID: ${data.empId}
    Basic: ₹${data.basic}
    HRA: ₹${data.hra}
    Special Allowance: ₹${data.specialAllowance}
    Bonus: ₹${data.bonus}
    Others: ₹${data.others}
    PF Deducted: ₹${data.pf}
    Tax Deducted: ₹${data.tax}
    Gross Salary: ₹${data.gross}
    Net Salary: ₹${data.net}
  `;
  const blob = new Blob([pdfContent], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `SalarySlip_${data.month}_${data.year}.pdf`;
  link.click();
}

export default function PayrollAndTaxCenter() {
  const [tab, setTab] = useState(TABS[0]);
  const [month, setMonth] = useState("06");
  const [year, setYear] = useState("2025");

  const salaryKey = `${year}-${month}`;
  const data = demoSalaryData[salaryKey] || demoSalaryData["2025-06"];
  const pieData = [
    { name: "Basic", value: data.basic },
    { name: "HRA", value: data.hra },
    { name: "Special Allowance", value: data.specialAllowance },
    { name: "Bonus", value: data.bonus },
    { name: "Others", value: data.others },
    { name: "PF", value: data.pf },
    { name: "Tax", value: data.tax },
  ];
  const barData = Object.entries(demoSalaryData).map(([k, v]) => ({
    month: `${months[+k.split("-")[1] - 1].label} ${k.split("-")[0]}`,
    net: v.net,
  }));

  return (
    <div className="payroll-bg">
      <div className="payroll-center-container">
        <h2 className="payroll-title">Payroll & Tax Center</h2>
        <div className="payroll-tabs">
          {TABS.map((t) => (
            <button
              key={t}
              className={tab === t ? "active" : ""}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="payroll-tab-content">
          {tab === "Salary Slip" && (
            <div className="dashboard-cards">
              <div className="dashboard-card card-lg">
                <div className="card-header">
                  <span className="card-title">Salary Slip Preview</span>
                  <button
                    className="download-btn"
                    onClick={() =>
                      downloadPDF({
                        ...data,
                        month: months[+month - 1].label,
                        year,
                      })
                    }
                  >
                    Download PDF
                  </button>
                </div>
                <div className="salary-slip-filters">
                  <label>
                    Month:{" "}
                    <select value={month} onChange={e => setMonth(e.target.value)}>
                      {months.map(m => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Year:{" "}
                    <select value={year} onChange={e => setYear(e.target.value)}>
                      {["2025","2024","2023"].map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="salary-details-grid">
                  <div>
                    <span>Name:</span>
                    <strong>{data.name}</strong>
                  </div>
                  <div>
                    <span>Emp ID:</span>
                    <strong>{data.empId}</strong>
                  </div>
                  <div>
                    <span>Month/Year:</span>
                    <strong>{months[+month-1].label} {year}</strong>
                  </div>
                  <div>
                    <span>Basic:</span>
                    <strong>₹{data.basic}</strong>
                  </div>
                  <div>
                    <span>HRA:</span>
                    <strong>₹{data.hra}</strong>
                  </div>
                  <div>
                    <span>Special Allowance:</span>
                    <strong>₹{data.specialAllowance}</strong>
                  </div>
                  <div>
                    <span>Bonus:</span>
                    <strong>₹{data.bonus}</strong>
                  </div>
                  <div>
                    <span>Others:</span>
                    <strong>₹{data.others}</strong>
                  </div>
                  <div>
                    <span>PF:</span>
                    <strong>₹{data.pf}</strong>
                  </div>
                  <div>
                    <span>Tax:</span>
                    <strong>₹{data.tax}</strong>
                  </div>
                  <div>
                    <span>Gross Salary:</span>
                    <strong>₹{data.gross}</strong>
                  </div>
                  <div>
                    <span>Net Salary:</span>
                    <strong>₹{data.net}</strong>
                  </div>
                </div>
              </div>
              <div className="dashboard-card">
                <h5>Salary Structure (Pie Chart)</h5>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%" cy="50%"
                      innerRadius={44}
                      outerRadius={85}
                      fill="#3578e5"
                      label
                    >
                      {pieData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <PieTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="dashboard-card">
                <h5>Net Salary Trend (Bar Chart)</h5>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <BarTooltip />
                    <Bar dataKey="net" fill="#2362d1" radius={[5,5,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {tab === "PF Balance" && (
            <div className="dashboard-cards">
              <div className="dashboard-card card-lg">
                <h4 className="card-title">Provident Fund Details</h4>
                <div className="pf-details">
                  <div>
                    <span>Current Balance:</span>
                    <strong>₹1,54,320</strong>
                  </div>
                  <div>
                    <span>Last Contribution:</span>
                    <strong>₹4,200 (June 2025)</strong>
                  </div>
                  <div>
                    <span>UAN:</span>
                    <strong>10023456012</strong>
                  </div>
                  <div>
                    <span>Status:</span>
                    <strong>Active</strong>
                  </div>
                  <button className="view-passbook-btn">View Passbook</button>
                </div>
              </div>
              <div className="dashboard-card">
                <h5>PF Contribution Trend</h5>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[
                    { month: "April", pf: 4100 },
                    { month: "May", pf: 4200 },
                    { month: "June", pf: 4200 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <BarTooltip />
                    <Bar dataKey="pf" fill="#48bb78" radius={[8,8,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {tab === "Tax Info" && (
            <div className="dashboard-cards">
              <div className="dashboard-card card-lg">
                <h4 className="card-title">Tax Information</h4>
                <div className="tax-details">
                  <div>
                    <span>PAN:</span>
                    <strong>AAAAA1234Z</strong>
                  </div>
                  <div>
                    <span>Total Tax Paid (FY 2024-25):</span>
                    <strong>₹36,000</strong>
                  </div>
                  <div>
                    <span>Tax Regime:</span>
                    <strong>New</strong>
                  </div>
                  <div>
                    <span>Declaration Submitted:</span>
                    <strong>Yes</strong>
                  </div>
                  <div>
                    <span>Last Updated:</span>
                    <strong>10-July-2025</strong>
                  </div>
                </div>
              </div>
              <div className="dashboard-card">
                <h5>Tax Paid Trend</h5>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[
                    { month: "April", tax: 2950 },
                    { month: "May", tax: 3000 },
                    { month: "June", tax: 3000 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <BarTooltip />
                    <Bar dataKey="tax" fill="#f56565" radius={[8,8,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {tab === "Tax Declaration" && (
            <div className="dashboard-cards">
              <div className="dashboard-card card-lg">
                <h4 className="card-title">Income Tax Declaration</h4>
                <form className="tax-declaration-form">
                  <label>
                    Section 80C Investment (₹):
                    <input type="number" defaultValue="80000" min="0" />
                  </label>
                  <label>
                    Section 80D (Health Insurance Premium) (₹):
                    <input type="number" defaultValue="18000" min="0" />
                  </label>
                  <label>
                    Rent Paid (₹):
                    <input type="number" defaultValue="90000" min="0" />
                  </label>
                  <label>
                    Other Declarations:
                    <input type="text" placeholder="Enter details" />
                  </label>
                  <button className="submit-declaration-btn" type="button">
                    Submit Declaration
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

