import React, { useState } from "react";
import { admins } from "../mockEmployees";

export default function BulkActions({ selectedCount, onBulkShift, onBulkManager, onExport }) {
  const [shift, setShift] = useState("");
  const weekOffList = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];
  const [selectedWeekOff, setSelectedWeekOff] = useState("");

  return (
    <div className="bulk-actions">
      <button onClick={onExport} disabled={selectedCount===0}>📥 Export CSV</button>
      <span>{selectedCount} selected</span>
      <select value={shift} onChange={e=>setShift(e.target.value)}>
        <option value="">Bulk Shift →</option>
        {["A","B","C"].map(s=> <option key={s} value={s}>Shift {s}</option>)}
      </select>
      <button onClick={()=>{ if(shift) onBulkShift(shift); setShift("") }} disabled={!shift}>Apply</button>
      <select
      value={selectedWeekOff}
      onChange={e => setSelectedWeekOff(e.target.value)}
    >
      <option value="">Bulk WeekOff →</option>
      {weekOffList.map(day => (
        <option key={day} value={day}>{day}</option>
      ))}
    </select>
    <button
      onClick={() => {
        if (selectedWeekOff) onBulkWeekOff(selectedWeekOff);
      }}
      disabled={!selectedWeekOff || !selectedCount}
    >Apply</button>
    </div>
  );
}
