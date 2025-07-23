// import React, { useState, useMemo } from "react";
// import FilterBar from "./Shift/FilterBar";
// import BulkActions from "./Shift/BulkActions";
// import ShiftTable from "./Shift/ShiftTable";
// import CalendarView from "./Shift/CalendarView";
// import Pagination from "./Shift/Pagination";
// import { employees as initialEmployees } from "./Shift/mockData";
// import { getEmployeeShiftForDate, shiftPatterns  } from "./Shift/shiftPatternUtils";
// import "./ShiftManagement.css";

// const ShiftManagement = () => {
//   const [employees, setEmployees] = useState(initialEmployees);
//   const [filters, setFilters] = useState({
//     search: "", 
//     dept: "", 
//     role: "", 
//     status: "", 
//     shift: "", 
//     weekOff: "", 
//     date: "2025-07-01"
//   });
  
//   const [sortConfig, setSortConfig] = useState({ 
//     key: "name", 
//     direction: "asc" 
//   });
  
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 20;

// const processed = useMemo(() => {
//   const dateStr = filters.date;
//   const day = new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });
  
//   return employees
//     .map(emp => {
//       const { shift, weekOff } = getEmployeeShiftForDate(emp, dateStr);
//       return { 
//         ...emp, 
//         currentShift: shift, 
//         currentWeekOff: weekOff,
//         // Set working status based on shift type
//         isWorking: shift !== 'General' && weekOff !== day
//       };
//     })
//     .filter(emp => {
//       // Always show shift employees, show general only when not working
//       if (emp.shift === "General") {
//         return !emp.isWorking;  // Show general employees only when on leave
//       }
//       return emp.isWorking;  // Show shift employees when working
//     })
//     .filter(emp => {
//       // Apply other filters
//       return (
//         (!filters.search || emp.name.toLowerCase().includes(filters.search.toLowerCase())) &&
//         (!filters.dept || emp.dept === filters.dept) &&
//         (!filters.role || emp.role === filters.role) &&
//         (!filters.status || emp.status === filters.status) &&
//         (!filters.shift || emp.currentShift === filters.shift) &&
//         (!filters.weekOff || emp.currentWeekOff === filters.weekOff)
//       );
//     })
//     .sort((a, b) => {
//       const key = sortConfig.key;
//       const aVal = a[key];
//       const bVal = b[key];
      
//       if (aVal === bVal) return 0;
//       const direction = sortConfig.direction === "asc" ? 1 : -1;
      
//       return (aVal < bVal ? -1 : 1) * direction;
//     });
// }, [employees, filters, sortConfig]);

//   // Pagination
//   const paged = useMemo(() => {
//     const start = (currentPage - 1) * pageSize;
//     return processed.slice(start, start + pageSize);
//   }, [processed, currentPage]);

//   // Handlers
//   const handleFilter = (newFilters) => { 
//     setFilters(newFilters); 
//     setCurrentPage(1); 
//   };
  
//   const handleSort = (key) => {
//     setSortConfig(prev => ({
//       key,
//       direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
//     }));
//   };
  
//   const handleSelect = (id) => {
//     setSelectedIds(ids => 
//       ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]
//     );
//   };
  
//   const handleSelectAll = () => {
//     setSelectedIds(prev => 
//       prev.length === paged.length ? [] : paged.map(e => e.id)
//     );
//   };
  
//   const handleBulkShift = (shift) => {
//     setEmployees(employees.map(e => 
//       selectedIds.includes(e.id) ? { ...e, shift } : e
//     ));
//     setSelectedIds([]);
//   };
  
//   const handleBulkWeekOff = (newWeekOff) => {
//     setEmployees(employees.map(e => 
//       selectedIds.includes(e.id) ? { ...e, manualWeekOff: newWeekOff } : e
//     ));
//     setSelectedIds([]);
//   };
  
//   const handleExport = () => {
//     const header = Object.keys(employees[0]).join(",");
//     const rows = processed.map(e => Object.values(e).join(",")).join("\n");
//     const blob = new Blob([`${header}\n${rows}`], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "shift-roster.csv";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="shift-management-wrapper">
//       <h2>Shift Management</h2>
      
//       <FilterBar 
//         filters={filters} 
//         onFilter={handleFilter} 
//         employees={employees}
//       />
      
//       <BulkActions
//         selectedCount={selectedIds.length}
//         onBulkShift={handleBulkShift}
//         onBulkWeekOff={handleBulkWeekOff}
//         onExport={handleExport}
//       />
      
//       <ShiftTable
//         data={paged}
//         totalCount={processed.length}
//         sortConfig={sortConfig}
//         onSort={handleSort}
//         selectedIds={selectedIds}
//         onSelect={handleSelect}
//         onSelectAll={handleSelectAll}
//         onInlineEdit={(id, field, value) => {
//           setEmployees(employees.map(e => 
//             e.id === id ? { ...e, [field]: value } : e
//           ));
//         }}
//       />
      
//       <Pagination
//         totalItems={processed.length}
//         pageSize={pageSize}
//         currentPage={currentPage}
//         onPageChange={setCurrentPage}
//       />
      
//       <CalendarView 
//         data={employees} 
//         shiftPatterns={shiftPatterns}
//         selectedDate={filters.date}
//         onDateSelect={(date) => handleFilter({ ...filters, date })}
//       />
      
//       {/* <SwapRequests /> */}
      
//       {/* <AuditLog /> */}
//     </div>
//   );
// };

// export default ShiftManagement;



import React, { useEffect, useState, useMemo } from "react";
import Papa from "papaparse";
import FilterBar from "./Shift/FilterBar";  // Keep your filter bar
import ShiftTable from "./Shift/ShiftTable"; // Keep your table
import "./ShiftManagement.css";
import CalendarView from "./Shift/CalendarView"; // Keep your calendar view
const csvUrl = "/shift_db_jul2025.csv"; // Path to your CSV in public/static folder

const shiftOptions = {
  "I": "I Shift (07:00 - 15:30)",
  "II": "II Shift (15:00 - 23:30)",
  "III": "III Shift (23:00 - 07:30)",
  "General": "General (10:00 - 17:45)"
};

const weekOffList = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "General"
];

export default function ShiftManagement() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ search: "", shift: "", weekOff: "", date: "" });
  const [selectedIds, setSelectedIds] = useState([]);
  const [showBulkChange, setShowBulkChange] = useState(false);
  const [bulkWeekOff, setBulkWeekOff] = useState("");
useEffect(() => {
  Papa.parse(csvUrl, {
    download: true,
    header: true,
    complete: (result) => {
      console.log("CSV load result:", result); // Debug: check what's loaded!
      setData(result.data);
    },
    error: (err) => {
      console.error("CSV load ERROR:", err);
    }
  });
}, []);

  // Filtering logic
  const filteredData = useMemo(() => {
    let out = data;
    if (filters.search) out = out.filter(row => (row["Employee Name"] || "").toLowerCase().includes(filters.search.toLowerCase()));
    if (filters.shift) out = out.filter(row => row.Shift === filters.shift);
    if (filters.weekOff) out = out.filter(row => row["Weekoff"] === filters.weekOff);
    if (filters.date) out = out.filter(row => row.Date === filters.date);
    return out;
  }, [data, filters]);

    // Checkbox logic
  const handleSelect = (rowIdx, checked) => {
    setSelectedIds(ids => checked ? [...ids, rowIdx] : ids.filter(id => id !== rowIdx));
  };
  const handleSelectAll = (checked) => {
    if (checked) setSelectedIds(filteredData.map((_, idx) => idx));
    else setSelectedIds([]);
  };

  // Bulk week off handler
  const handleBulkWeekOffChange = () => {
    // Mutate week off for selected indexes only
    const updated = data.map((row, idx) =>
      selectedIds.includes(idx)
        ? { ...row, ["Weekoff"]: bulkWeekOff }
        : row
    );
    setData(updated);
    setSelectedIds([]);
    setShowBulkChange(false);
    setBulkWeekOff("");
  };

  return (
    <div className="shift-management-wrapper">
      <h2>Shift Management</h2>
      <FilterBar
        filters={filters}
        onFilter={setFilters}
        shiftOptions={shiftOptions}
        weekOffList={weekOffList}
        showDate={true}
      />

      {selectedIds.length > 0 && (
        <div className="bulk-actions" style={{ marginBottom: 12 }}>
          <span>
            <b>{selectedIds.length}</b> selected &nbsp; 
            <button onClick={() => setShowBulkChange(v => !v)}>
              Change Week Off
            </button>
          </span>
          {showBulkChange && (
            <>
              <select value={bulkWeekOff} onChange={e => setBulkWeekOff(e.target.value)}>
                <option value="">Select Day</option>
                {weekOffList.slice(0, 7).map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <button
                onClick={handleBulkWeekOffChange}
                disabled={!bulkWeekOff}
                style={{ background: "#1e3a8a", color: "#fff" }}
              >Apply</button>
            </>
          )}
        </div>
      )}

      <ShiftTable
        data={filteredData}
        selectedIds={selectedIds}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
      />
      <CalendarView data={data} />
    </div>
  );
}

