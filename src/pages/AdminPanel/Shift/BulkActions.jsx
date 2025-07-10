import React, { useState } from "react";
import { admins } from "../mockEmployees";

export default function BulkActions({ selectedCount, onBulkShift, onBulkManager, onExport }) {
  const [shift, setShift] = useState("");
  const [mgr, setMgr] = useState("");

  return (
    <div className="bulk-actions">
      <button onClick={onExport} disabled={selectedCount===0}>📥 Export CSV</button>
      <span>{selectedCount} selected</span>
      <select value={shift} onChange={e=>setShift(e.target.value)}>
        <option value="">Bulk Shift →</option>
        {["A","B","C"].map(s=> <option key={s} value={s}>Shift {s}</option>)}
      </select>
      <button onClick={()=>{ if(shift) onBulkShift(shift); setShift("") }} disabled={!shift}>Apply</button>
      <select value={mgr} onChange={e=>setMgr(e.target.value)}>
        <option value="">Bulk Manager →</option>
        {admins.map(a=> <option key={a.id} value={a.name}>{a.name}</option>)}
      </select>
      <button onClick={()=>{ if(mgr) onBulkManager(mgr); setMgr("") }} disabled={!mgr}>Apply</button>
    </div>
  );
}
