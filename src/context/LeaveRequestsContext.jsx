import React, { createContext, useContext, useState } from "react";

// Sample initial data (move your default requests here)
const initialLeaveRequests = [
  {
    empId: "EMP001",
    name: "Sandeep pal",
    department: "IT",
    leaveType: "Privilege Leave",
    fromDate: "2025-06-10",
    toDate: "2025-06-12",
    reason: "Family function",
    status: "Approved"
  },
  {
    empId: "EMP999",
    name: "Anita Sharma",
    department: "Finance",
    leaveType: "Sick Leave",
    fromDate: "2025-06-18",
    toDate: "2025-06-20",
    reason: "Medical leave not supported with documents",
    status: "Rejected"
  }
];

const LeaveRequestsContext = createContext();


export function LeaveRequestsProvider({ children }) {
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
  return (
    <LeaveRequestsContext.Provider value={{ leaveRequests, setLeaveRequests }}>
      {children}
    </LeaveRequestsContext.Provider>
  );
}

export function useLeaveRequests() {
  const context = useContext(LeaveRequestsContext);
  if (!context) {
    throw new Error("useLeaveRequests must be used within a LeaveRequestsProvider");
  }
  return context;
}


