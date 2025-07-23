// import React from 'react';

// const unique = (arr, key) => [...new Set(arr.map(x => x[key]))];
// const weekOffList = [
//   "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
// ];

// export default function FilterBar({ filters, onFilter, employees }) {
//   const depts = unique(employees, "dept");
//   const roles = unique(employees, "role");
//   const statuses = unique(employees, "status");
  
//   const shiftOptions = {
//     'I': "I Shift (07:00 - 15:30)",
//     'II': "II Shift (15:00 - 23:30)",
//     'III': "III Shift (23:00 - 07:30)",
//     'General': "General Shift"
//   };

//   return (
//     <div className="filter-bar">
//       <input
//         type="text"
//         placeholder="Search name..."
//         value={filters.search}
//         onChange={e => onFilter({ ...filters, search: e.target.value })}
//       />
      
//       <select 
//         value={filters.dept} 
//         onChange={e => onFilter({ ...filters, dept: e.target.value })}
//       >
//         <option value="">All Departments</option>
//         {depts.map(d => <option key={d} value={d}>{d}</option>)}
//       </select>
      
//       <select 
//         value={filters.role} 
//         onChange={e => onFilter({ ...filters, role: e.target.value })}
//       >
//         <option value="">All Roles</option>
//         {roles.map(r => <option key={r} value={r}>{r}</option>)}
//       </select>
      
//       <select 
//         value={filters.status} 
//         onChange={e => onFilter({ ...filters, status: e.target.value })}
//       >
//         <option value="">All Status</option>
//         {statuses.map(s => <option key={s} value={s}>{s}</option>)}
//       </select>
      
//       <select 
//         value={filters.shift} 
//         onChange={e => onFilter({ ...filters, shift: e.target.value })}
//       >
//         <option value="">All Shifts</option>
//         {Object.entries(shiftOptions).map(([value, label]) => (
//           <option key={value} value={value}>{label}</option>
//         ))}
//       </select>
      
//       <select 
//         value={filters.weekOff} 
//         onChange={e => onFilter({ ...filters, weekOff: e.target.value })}
//       >
//         <option value="">All Week Offs</option>
//         {weekOffList.map(day => (
//           <option key={day} value={day}>{day}</option>
//         ))}
//       </select>
      
//       <input
//         type="date"
//         value={filters.date}
//         onChange={e => onFilter({ ...filters, date: e.target.value })}
//         min="2025-01-01"
//         max="2025-12-31"
//       />
//     </div>
//   );
// }


import React from "react";

export default function FilterBar({ filters, onFilter, shiftOptions, weekOffList, showDate }) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search name..."
        value={filters.search}
        onChange={e => onFilter({ ...filters, search: e.target.value })}
      />
      <select value={filters.shift} onChange={e => onFilter({ ...filters, shift: e.target.value })}>
        <option value="">All Shifts</option>
        {Object.keys(shiftOptions).map(s => (
          <option key={s} value={s}>{shiftOptions[s]}</option>
        ))}
      </select>
      <select
        value={filters.weekOff}
        onChange={e => onFilter({ ...filters, weekOff: e.target.value })}
      >
        <option value="">All Day Offs</option>
        {weekOffList.map(day => (
          <option key={day} value={day}>{day}</option>
        ))}
      </select>
      {showDate && (
        <label style={{ marginLeft: "1rem" }}>
          Date:
          <input
            type="date"
            value={filters.date}
            onChange={e => onFilter({ ...filters, date: e.target.value })}
            style={{ marginLeft: "-0.5rem" }}
          />
        </label>
      )}
    </div>
  );
}
