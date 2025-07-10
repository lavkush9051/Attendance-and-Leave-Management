import React, { useState } from "react";
import "./PayrollAndTaxCenter.css";

const TABS = ["Salary Slip", "PF Balance", "Tax Info", "Tax Declaration"];

const demoSalarySlip = {
  name: "Lavkush Singh",
  month: "June",
  year: "2025",
  empId: "EMP0123",
  basic: 35000,
  hra: 12000,
  pf: 4200,
  gross: 55000,
  tax: 3000,
  net: 52000,
};

function downloadPDF(data) {
  // Generate a simple PDF using Blob (for demo)
  const pdfContent = `
    Salary Slip - ${data.month} ${data.year}

    Name: ${data.name}
    Employee ID: ${data.empId}
    Basic: ₹${data.basic}
    HRA: ₹${data.hra}
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

  return (
    <div className="payroll-center-container">
      <h2>Payroll & Tax Center</h2>
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
          <div className="salary-slip-section">
            <div className="salary-slip-filters">
              <label>
                Month:{" "}
                <select value={month} onChange={e => setMonth(e.target.value)}>
                  {["01","02","03","04","05","06","07","08","09","10","11","12"].map(m => (
                    <option key={m} value={m}>
                      {new Date(2025, +m-1, 1).toLocaleString("en", {month:"long"})}
                    </option>
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
              <button
                className="download-btn"
                onClick={() =>
                  downloadPDF({
                    ...demoSalarySlip,
                    month: new Date(2025, +month-1, 1).toLocaleString("en", {month:"long"}),
                    year,
                  })
                }
              >
                Download Salary Slip (PDF)
              </button>
            </div>
            <div className="salary-slip-mock">
              <h4>Salary Slip Preview</h4>
              <div><strong>Name:</strong> {demoSalarySlip.name}</div>
              <div><strong>Employee ID:</strong> {demoSalarySlip.empId}</div>
              <div><strong>Month/Year:</strong> {new Date(2025, +month-1, 1).toLocaleString("en", {month:"long"})} {year}</div>
              <div><strong>Basic:</strong> ₹{demoSalarySlip.basic}</div>
              <div><strong>HRA:</strong> ₹{demoSalarySlip.hra}</div>
              <div><strong>PF:</strong> ₹{demoSalarySlip.pf}</div>
              <div><strong>Tax:</strong> ₹{demoSalarySlip.tax}</div>
              <div><strong>Gross Salary:</strong> ₹{demoSalarySlip.gross}</div>
              <div><strong>Net Salary:</strong> ₹{demoSalarySlip.net}</div>
            </div>
          </div>
        )}

        {tab === "PF Balance" && (
          <div className="pf-section">
            <h4>Provident Fund Balance</h4>
            <div className="pf-details">
              <div><strong>Current Balance:</strong> ₹1,54,320</div>
              <div><strong>Last Contribution:</strong> ₹4,200 (June 2025)</div>
              <div><strong>UAN:</strong> 10023456012</div>
              <div><strong>Status:</strong> Active</div>
              <button className="view-passbook-btn">View Passbook (Demo)</button>
            </div>
          </div>
        )}

        {tab === "Tax Info" && (
          <div className="tax-section">
            <h4>Tax Summary</h4>
            <div className="tax-details">
              <div><strong>PAN:</strong> AAAAA1234Z</div>
              <div><strong>Total Tax Paid (FY 2024-25):</strong> ₹36,000</div>
              <div><strong>Tax Regime:</strong> New</div>
              <div><strong>Declaration Submitted:</strong> Yes</div>
              <div><strong>Last Updated:</strong> 10-July-2025</div>
            </div>
          </div>
        )}

        {tab === "Tax Declaration" && (
          <div className="tax-declaration-section">
            <h4>Income Tax Declaration</h4>
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
        )}
      </div>
    </div>
  );
}
