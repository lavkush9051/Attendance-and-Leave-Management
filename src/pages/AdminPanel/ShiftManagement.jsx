



// shiftPatternUtils.js

// import React, { useEffect, useState, useMemo } from "react";
// import Papa from "papaparse";
// import FilterBar from "./Shift/FilterBar";  // Keep your filter bar
// import ShiftTable from "./Shift/ShiftTable"; // Keep your table
// import "./ShiftManagement.css";
// import CalendarView from "./Shift/CalendarView"; // Keep your calendar view
// const csvUrl = "/shift_db_jul2025.csv"; // Path to your CSV in public/static folder

// const shiftOptions = {
//   "I": "I Shift (07:00 - 15:30)",
//   "II": "II Shift (15:00 - 23:30)",
//   "III": "III Shift (23:00 - 07:30)",
//   "General": "General (10:00 - 17:45)"
// };

// const weekOffList = [
//   "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "General"
// ];

// export default function ShiftManagement() {
//   const [data, setData] = useState([]);
//   const [filters, setFilters] = useState({ search: "", shift: "", weekOff: "", date: "" });
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [showBulkChange, setShowBulkChange] = useState(false);
//   const [bulkWeekOff, setBulkWeekOff] = useState("");

//   useEffect(() => {
//   fetch("http://127.0.0.1:8000/api/employees")
//     .then((response) => response.json())
//     .then((result) => {
//       setData(result);
//       console.log("API load result:", result); // Debug!
//     })
//     .catch((err) => {
//       console.error("API load ERROR:", err);
//     });
// }, []);


//   // Filtering logic
//   const filteredData = useMemo(() => {
//     let out = data;
//     if (filters.search) out = out.filter(row => (row["Employee Name"] || "").toLowerCase().includes(filters.search.toLowerCase()));
//     if (filters.shift) out = out.filter(row => row.Shift === filters.shift);
//     if (filters.weekOff) out = out.filter(row => row["Weekoff"] === filters.weekOff);
//     if (filters.date) out = out.filter(row => row.Date === filters.date);
//     return out;
//   }, [data, filters]);

//     // Checkbox logic
//   const handleSelect = (rowIdx, checked) => {
//     setSelectedIds(ids => checked ? [...ids, rowIdx] : ids.filter(id => id !== rowIdx));
//   };
//   const handleSelectAll = (checked) => {
//     if (checked) setSelectedIds(filteredData.map((_, idx) => idx));
//     else setSelectedIds([]);
//   };

//   // Bulk week off handler
//   const handleBulkWeekOffChange = () => {
//     // Mutate week off for selected indexes only
//     const updated = data.map((row, idx) =>
//       selectedIds.includes(idx)
//         ? { ...row, ["Weekoff"]: bulkWeekOff }
//         : row
//     );
//     setData(updated);
//     setSelectedIds([]);
//     setShowBulkChange(false);
//     setBulkWeekOff("");
//   };

//   return (
//     <div className="shift-management-wrapper">
//       <h2>Shift Management</h2>
//       <FilterBar
//         filters={filters}
//         onFilter={setFilters}
//         shiftOptions={shiftOptions}
//         weekOffList={weekOffList}
//         showDate={true}
//       />

//       {selectedIds.length > 0 && (
//         <div className="bulk-actions" style={{ marginBottom: 12 }}>
//           <span>
//             <b>{selectedIds.length}</b> selected &nbsp; 
//             <button onClick={() => setShowBulkChange(v => !v)}>
//               Change Week Off
//             </button>
//           </span>
//           {showBulkChange && (
//             <>
//               <select value={bulkWeekOff} onChange={e => setBulkWeekOff(e.target.value)}>
//                 <option value="">Select Day</option>
//                 {weekOffList.slice(0, 7).map(day => (
//                   <option key={day} value={day}>{day}</option>
//                 ))}
//               </select>
//               <button
//                 onClick={handleBulkWeekOffChange}
//                 disabled={!bulkWeekOff}
//                 style={{ background: "#1e3a8a", color: "#fff" }}
//               >Apply</button>
//             </>
//           )}
//         </div>
//       )}

//       <ShiftTable
//         data={filteredData}
//         selectedIds={selectedIds}
//         onSelect={handleSelect}
//         onSelectAll={handleSelectAll}
//       />
//       <CalendarView data={data} />
//     </div>
//   );
// }

import React, { useEffect, useState, useMemo } from "react";
import FilterBar from "./Shift/FilterBar";
import ShiftTable from "./Shift/ShiftTable";
import CalendarView from "./Shift/CalendarView";
import "./ShiftManagement.css";

// Shift pattern logic (can be moved to its own helper file if you wish)
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const defaultInitialShifts = ["Saturday", "Wednesday", "Friday", "Monday", "Thursday", "Sunday"];
const weekOffList = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "General"
];

const shiftOptions = {
  "I": "I Shift (07:00 - 15:30)",
  "II": "II Shift (15:00 - 23:30)",
  "III": "III Shift (23:00 - 07:30)",
  "General": "General (10:00 - 17:45)"
};

// Helper to get the shift pattern for a given date (immutable)
function getUpdatedInitialShifts(selectedDateStr) {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let shifts = ["Saturday", "Wednesday", "Friday", "Monday", "Thursday", "Sunday"];
  const startDate = new Date("2025-07-01");
  const selectedDate = new Date(selectedDateStr);

  // How many days to shift from startDate up to selectedDate?
  const daysToShift = Math.max(
    0,
    Math.floor((selectedDate - startDate) / (1000 * 60 * 60 * 24))
  );

  // Work on a copy so as not to mutate the initial reference
  let currentShifts = [...shifts];

  for (let i = 0; i <= daysToShift; i++) {
    // For each day from startDate up to and including selectedDate
    let thisDate = new Date(startDate);
    thisDate.setDate(startDate.getDate() + i);
    let weekday = weekdays[thisDate.getDay()];

    // Only update for i > 0 (skip update for the very first day, just collect the pattern)
    if (i > 0) {
      // For every element in currentShifts
      currentShifts = currentShifts.map(shiftDay => 
        shiftDay === weekday
          ? weekdays[(weekdays.indexOf(shiftDay) - 1 + 7) % 7] // Previous day
          : shiftDay
      );
    }
  }
  console.log("Updated Shifts for", selectedDateStr, ":", currentShifts.join(", "));
  return currentShifts;
}



function getShiftForWeekoff(emp_weekoff, updatedInitialShifts) {
  const idx = updatedInitialShifts.indexOf(emp_weekoff);
  if (idx === -1) return ""; // Not found
  if (idx < 2) return "I";
  if (idx < 4) return "II";
  return "III";
}

export default function ShiftManagement() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ search: "", shift: "", weekOff: "", date: "2025-07-01" });
  const [selectedIds, setSelectedIds] = useState([]);
  const [showBulkChange, setShowBulkChange] = useState(false);
  const [bulkWeekOff, setBulkWeekOff] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/employees")
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        console.error("API load ERROR:", err);
      });
  }, []);

  // Get the weekoff pattern for the currently selected date
  const updatedInitialShifts = useMemo(
    () => getUpdatedInitialShifts(filters.date),
    [filters.date]
  );

  // Assign shift to each row for the current day and enrich with Date column
  const enrichedData = useMemo(() => {
    return data
      .filter(row => row.emp_weekoff && updatedInitialShifts.includes(row.emp_weekoff))
      .map(row => ({
        ...row,
        Shift: getShiftForWeekoff(row.emp_weekoff, updatedInitialShifts),
        Date: filters.date // For UI display
      }));
  }, [data, updatedInitialShifts, filters.date]);

  // Apply further filters (search, shift, weekOff)
  const filteredData = useMemo(() => {
    let out = enrichedData;
    if (filters.search)
      out = out.filter(row =>
        (row.emp_name || "").toLowerCase().includes(filters.search.toLowerCase())
      );
    if (filters.shift)
      out = out.filter(row => row.Shift === filters.shift);
    if (filters.weekOff)
      out = out.filter(row => row.emp_weekoff === filters.weekOff);
    return out;
  }, [enrichedData, filters]);

  // Checkbox logic
  const handleSelect = (rowIdx, checked) => {
    setSelectedIds(ids => checked ? [...ids, rowIdx] : ids.filter(id => id !== rowIdx));
  };
  const handleSelectAll = (checked) => {
    if (checked) setSelectedIds(filteredData.map((_, idx) => idx));
    else setSelectedIds([]);
  };

  // Bulk week off handler
 const handleBulkWeekOffChange = async () => {
  const empIdsToUpdate = filteredData
    .map((row, idx) => selectedIds.includes(idx) ? row.emp_id : null)
    .filter(x => x !== null);

  if (!bulkWeekOff || empIdsToUpdate.length === 0) return;

  // API call
  try {
    const res = await fetch("http://127.0.0.1:8000/api/employees/weekoff", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emp_ids: empIdsToUpdate,
        weekoff: bulkWeekOff
      }),
    });
    const result = await res.json();
    if (result.status === "success") {
      // Optimistically update local data (or reload from backend)
      setData(data.map(row =>
        empIdsToUpdate.includes(row.emp_id)
          ? { ...row, emp_weekoff: bulkWeekOff }
          : row
      ));
    } else {
      alert("Update failed: " + (result.error || ""));
    }
  } catch (err) {
    alert("API error: " + err);
  }
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
      {/* <CalendarView data={data} /> */}
    </div>
  );
}
