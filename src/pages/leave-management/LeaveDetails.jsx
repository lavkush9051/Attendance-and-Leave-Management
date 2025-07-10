import React from "react";
import "./LeaveDetails.css";

const LeaveDetails = ({ leaveBalances }) => {
  return (
    <div className="leave-details-container">
      <h2 className="details-title">Leave Balance</h2>

      <div className="details-table-container">
        <table className="details-table">
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Total</th>
              <th>Taken</th>
              <th>Remaining</th>
            </tr>
          </thead>
          <tbody>
            {leaveBalances.map((balance) => (
              <tr key={balance.type}>
                <td>{balance.type}</td>
                <td>{balance.total}</td>
                <td>{balance.taken}</td>
                <td className="remaining-cell">{balance.remaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveDetails;