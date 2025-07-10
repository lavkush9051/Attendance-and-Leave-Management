import React from "react";

export default function SwapRequests({ requests, onUpdate }) {
  return (
    <div className="swap-requests">
      <h3>Shift Swap Requests</h3>
      <table>
        <thead>
          <tr>
            <th>Emp A</th><th>Emp B</th><th>Date</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(r=>(
            <tr key={r.id}>
              <td>{r.from}</td><td>{r.to}</td><td>{r.date}</td><td>{r.status}</td>
              <td>
                {r.status==="Pending" && <>
                  <button onClick={()=>onUpdate(r.id,"Approved")}>Approve</button>
                  <button onClick={()=>onUpdate(r.id,"Rejected")}>Reject</button>
                </>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
