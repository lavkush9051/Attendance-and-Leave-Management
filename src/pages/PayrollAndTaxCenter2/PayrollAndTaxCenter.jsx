import React, { useState } from "react";
import SalarySlip from "./components/SalarySlip";
import PFBalance from "./components/PFBalance";
import TaxInfo from "./components/TaxInfo";
import IncomeTaxDeclaration from "./components/IncomeTaxDeclaration";
import "./PayrollAndTaxCenter.css";

const tabs = ["Salary Slip", "PF Balance", "Tax Info", "Income Tax Declaration"];

const PayrollAndTaxCenter = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Salary Slip": return <SalarySlip />;
      case "PF Balance": return <PFBalance />;
      case "Tax Info": return <TaxInfo />;
      case "Income Tax Declaration": return <IncomeTaxDeclaration />;
      default: return null;
    }
  };

  return (
    <div className="payroll-container">
      <h2>Payroll & Tax Center</h2>
      <div className="payroll-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={tab === activeTab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="payroll-content">{renderActiveTab()}</div>
    </div>
  );
};

export default PayrollAndTaxCenter;
