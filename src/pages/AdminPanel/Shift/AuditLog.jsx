import React from "react";

export default function AuditLog({ events }) {
  return (
    <div className="audit-log">
      <h3>Change History</h3>
      <ul>
        {events.map(e=>(
          <li key={e.id}>
            <span className="time">{new Date(e.time).toLocaleString()}</span>
            <span className="msg">{e.msg}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
