import React from 'react';

export default function TaxInfo() {
  return (
    <div>
      <h3>Tax Information</h3>
      <ul>
        <li>PAN Number: <strong>ABCDE1234F</strong></li>
        <li>Tax Regime: <strong>New</strong></li>
        <li>TDS Deducted (YTD): <strong>₹25,000</strong></li>
        <li>Projected Annual Tax: <strong>₹1,20,000</strong></li>
      </ul>
    </div>
  );
}
