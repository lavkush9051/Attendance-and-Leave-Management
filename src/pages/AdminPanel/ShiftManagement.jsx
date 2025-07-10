import React, { useState, useEffect } from "react";
import FilterBar from "./Shift/FilterBar";
import BulkActions from "./Shift/BulkActions";
import ShiftTable from "./Shift/ShiftTable";
import CalendarView from "./Shift/CalendarView";
import SwapRequests from "./Shift/SwapRequests";
import AuditLog from "./Shift/AuditLog";
import Pagination from "./Shift/Pagination";
import { employees as initialEmployees, swapRequests as initialSwaps, auditEvents as initialAudit } from "./Shift/mockData";
import "./ShiftManagement.css";

const ShiftManagement = () => {
  // full data sets
  const [employees, setEmployees] = useState(initialEmployees);
  const [swapRequests, setSwapRequests] = useState(initialSwaps);
  const [auditEvents, setAuditEvents] = useState(initialAudit);

  // UI state
  const [filters, setFilters] = useState({ search: "", dept: "", role: "", status: "", shift: "" });
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // filtered + sorted slice
  const processed = React.useMemo(() => {
    let data = [...employees];

    // filter
    data = data.filter(e => 
      e.name.toLowerCase().includes(filters.search.toLowerCase())
      && (filters.dept ? e.dept === filters.dept : true)
      && (filters.role ? e.role === filters.role : true)
      && (filters.status ? e.status === filters.status : true)
      && (filters.shift ? e.shift === filters.shift : true)
    );

    // sort
    data.sort((a,b) => {
      const valA = a[sortConfig.key], valB = b[sortConfig.key];
      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return data;
  }, [employees, filters, sortConfig]);

  // pagination
  const paged = React.useMemo(() => {
    const start = (currentPage-1)*pageSize;
    return processed.slice(start, start+pageSize);
  }, [processed, currentPage]);

  // handlers
  const handleFilter = (newFilters) => { setFilters(newFilters); setCurrentPage(1); };
  const handleSort = (key) => {
    setSortConfig(cfg => ({
      key,
      direction: cfg.key===key && cfg.direction==="asc" ? "desc" : "asc"
    }));
  };
  const handleSelect = (id) => {
    setSelectedIds(ids => ids.includes(id) ? ids.filter(x=>x!==id) : [...ids,id]);
  };
  const handleSelectAll = (all) => {
    setSelectedIds(all ? paged.map(e=>e.id) : []);
  };
  const handleBulkShift = (shift) => {
    setEmployees(emp => emp.map(e=> selectedIds.includes(e.id) ? ({...e, shift}) : e));
    logAudit(`Bulk shift changed to ${shift} for ${selectedIds.length} employees`);
    setSelectedIds([]);
  };
  const handleBulkManager = (mgr) => {
    setEmployees(emp => emp.map(e=> selectedIds.includes(e.id) ? ({...e, manager:mgr}) : e));
    logAudit(`Bulk manager changed to ${mgr} for ${selectedIds.length} employees`);
    setSelectedIds([]);
  };
  const handleExport = () => {
    // simple CSV
    const header = Object.keys(employees[0]).join(",");
    const rows = processed.map(e=> Object.values(e).join(",")).join("\n");
    const csv = header + "\n" + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "shift_roster.csv";
    a.click();
  };
  const logAudit = (msg) => {
    setAuditEvents(a => [{ id: a.length+1, msg, time: new Date() }, ...a]);
  };

  return (
    <div className="shift-management-wrapper">
      <h2>Shift Management</h2>
      <FilterBar filters={filters} onFilter={handleFilter} data={employees}/>
      <BulkActions
        selectedCount={selectedIds.length}
        onBulkShift={handleBulkShift}
        onBulkManager={handleBulkManager}
        onExport={handleExport}
      />
      <ShiftTable
        data={paged}
        processedCount={processed.length}
        pageSize={pageSize}
        sortConfig={sortConfig}
        onSort={handleSort}
        selectedIds={selectedIds}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
        onInlineEdit={(id, field, value) => {
          setEmployees(emp => emp.map(e=> e.id===id? {...e,[field]:value}:e));
          logAudit(`Inline edit ${field}=${value} for ${id}`);
        }}
      />
      <Pagination
        total={processed.length}
        pageSize={pageSize}
        current={currentPage}
        onPageChange={setCurrentPage}
      />
      <CalendarView data={employees}/>
      {/* <SwapRequests requests={swapRequests} onUpdate={(id,status) => {
        setSwapRequests(rq => rq.map(r=>r.id===id?{...r,status}:r));
        logAudit(`Swap request ${id} ${status}`);
      }}/> */}
      <AuditLog events={auditEvents}/>
    </div>
  );
};

export default ShiftManagement;
