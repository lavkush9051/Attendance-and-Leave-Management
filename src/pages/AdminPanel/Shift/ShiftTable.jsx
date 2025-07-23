// ShiftTable.jsx

// import React from 'react';

// const ShiftTable = ({ 
//   data, 
//   totalCount,
//   sortConfig, 
//   onSort, 
//   selectedIds, 
//   onSelect,
//   onSelectAll,
//   onInlineEdit
// }) => {
//   const allSelected = data.length > 0 && selectedIds.length === data.length;
  
//   return (
//     <div className="shift-table-container">
//       <div className="table-info">
//         Showing {data.length} of {totalCount} employees
//       </div>
      
//       <table className="shift-table">
//         <thead>
//           <tr>
//             <th>
//               <input
//                 type="checkbox"
//                 checked={allSelected}
//                 onChange={() => onSelectAll()}
//               />
//             </th>
//             <th onClick={() => onSort('name')}>
//               NAME {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
//             </th>
//             <th>DEPT</th>
//             <th>MANAGER</th>
//             <th onClick={() => onSort('shift')}>
//               SHIFT {sortConfig.key === 'shift' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
//             </th>
//             <th>STATUS</th>
//             <th onClick={() => onSort('weekOff')}>
//               WEEKOFF {sortConfig.key === 'weekOff' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map(emp => (
//             <tr key={emp.id} className={selectedIds.includes(emp.id) ? 'selected' : ''}>
//               <td>
//                 <input
//                   type="checkbox"
//                   checked={selectedIds.includes(emp.id)}
//                   onChange={() => onSelect(emp.id)}
//                 />
//               </td>
//               <td>{emp.name}</td>
//               <td>{emp.dept}</td>
//               <td>
//                 <select
//                   value={emp.manager}
//                   onChange={e => onInlineEdit(emp.id, 'manager', e.target.value)}
//                 >
//                   {['Alice', 'Bob', 'Carol'].map(m => (
//                     <option key={m} value={m}>{m}</option>
//                   ))}
//                 </select>
//               </td>
//               <td>{emp.currentShift} Shift</td>
//               <td>
//                 <select
//                   value={emp.status}
//                   onChange={e => onInlineEdit(emp.id, 'status', e.target.value)}
//                 >
//                   {['Active', 'Inactive', 'On Leave'].map(s => (
//                     <option key={s} value={s}>{s}</option>
//                   ))}
//                 </select>
//               </td>
//               <td>{emp.currentWeekOff}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ShiftTable;

import React from "react";

export default function ShiftTable({ data, selectedIds, onSelect, onSelectAll }) {
  if (!data.length) return <div>No records to display</div>;
  const allChecked = selectedIds.length === data.length && data.length > 0;

  return (
    <table className="shift-table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={allChecked}
              onChange={e => onSelectAll(e.target.checked)}
            />
          </th>
          <th>Emp Id</th>
          <th>Emp Name</th>
          <th>Emp Designation</th>
          <th>Emp Dept</th>
          <th>Shift</th>
          <th>Weekoff</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            <td>
              <input
                type="checkbox"
                checked={selectedIds.includes(idx)}
                onChange={e => onSelect(idx, e.target.checked)}
              />
            </td>
            <td>{row["Emp Id"]}</td> 
            <td>{row["Emp Name"]}</td>
            <td>{row["Emp Designation"]}</td>
            <td>{row["Emp Dept"]}</td>
            <td>{row["Shift"]}</td>
            <td>{row["Weekoff"]}</td>
            <td>{row["Date"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
