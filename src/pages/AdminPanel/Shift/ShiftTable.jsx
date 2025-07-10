import React from "react";

export default function ShiftTable({
  data, processedCount, pageSize,
  sortConfig, onSort,
  selectedIds, onSelect, onSelectAll,
  onInlineEdit
}) {
  const allOnPage = data.every(e=> selectedIds.includes(e.id)) && data.length>0;

  const cellRenderer = (emp, field) => {
    let val = emp[field];
    return (
      <span onClick={()=>{
        const v = prompt(`Edit ${field}:`, val);
        if(v!==null) onInlineEdit(emp.id, field, v);
      }} className="inline-cell">{val}</span>
    );
  };

  return (
    <table className="shift-table">
      <thead>
        <tr>
          <th><input type="checkbox" checked={allOnPage} onChange={e=>onSelectAll(e.target.checked)}/></th>
          {["name","dept","manager","shift","status","Week Off"].map(key=>(
            <th key={key} onClick={()=>onSort(key)}>
              {key.toUpperCase()} {sortConfig.key===key?(sortConfig.direction==="asc"?"↑":"↓"):""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(emp => (
          <tr key={emp.id}>
            <td><input type="checkbox" checked={selectedIds.includes(emp.id)} onChange={()=>onSelect(emp.id)}/></td>
            <td>{cellRenderer(emp,"name")}</td>
            <td>{cellRenderer(emp,"dept")}</td>
            <td>{cellRenderer(emp,"manager")}</td>
            <td>{cellRenderer(emp,"shift")}</td>
            <td>{cellRenderer(emp,"status")}</td>
            {/* <td>{cellRenderer(emp,"weekOff")}</td> */}
            <td>{Array.isArray(emp.weekOff) ? emp.weekOff.join(", ") : emp.weekOff}</td>


          </tr>
        ))}
        {data.length===0 && (
          <tr><td colSpan={6} style={{ textAlign:"center" }}>No records</td></tr>
        )}
      </tbody>
    </table>
  );
}
