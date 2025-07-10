import React from "react";

const unique = (arr, key) => [...new Set(arr.map(x=>x[key]))];

export default function FilterBar({ filters, onFilter, data }) {
  const depts = unique(data, "dept"), roles = unique(data, "role"), statuses = unique(data, "status"), shifts = unique(data, "shift");
  const shiftOptions = {
    A: "A (07:00 - 15:30)",
    B: "B (15:00 - 23:30)",
    C: "C (23:00 - 07:30)",
  };
  const allDays = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search name..."
        value={filters.search}
        onChange={e=>onFilter({ ...filters, search: e.target.value })}
      />
      <select value={filters.dept} onChange={e=>onFilter({ ...filters, dept: e.target.value })}>
        <option value="">All Depts</option>
        {depts.map(d=> <option key={d} value={d}>{d}</option>)}
      </select>
      <select value={filters.role} onChange={e=>onFilter({ ...filters, role: e.target.value })}>
        <option value="">All Roles</option>
        {roles.map(r=> <option key={r} value={r}>{r}</option>)}
      </select>
      <select value={filters.status} onChange={e=>onFilter({ ...filters, status: e.target.value })}>
        <option value="">All Status</option>
        {statuses.map(s=> <option key={s} value={s}>{s}</option>)}
      </select>
      <select
        value={filters.shift}
        onChange={e => onFilter({ ...filters, shift: e.target.value })}
      >
        <option value="">All Shifts</option>
        {shifts.map(s => <option key={s} value={s}>{shiftOptions[s] || s}</option>)}
      </select>
    </div>
  );
}
