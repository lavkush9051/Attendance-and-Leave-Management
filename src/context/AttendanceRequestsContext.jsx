// AttendanceRequestsContext.jsx
import React, { createContext, useContext, useState } from "react";

const AttendanceRequestsContext = createContext();

export function AttendanceRequestsProvider({ children }) {
  const [attendanceRequests, setAttendanceRequests] = useState([]);
  return (
    <AttendanceRequestsContext.Provider value={{ attendanceRequests, setAttendanceRequests }}>
      {children}
    </AttendanceRequestsContext.Provider>
  );
}

export function useAttendanceRequests() {
  const context = useContext(AttendanceRequestsContext);
  if (!context) {
    throw new Error("useAttendanceRequests must be used within AttendanceRequestsProvider");
  }
  return context;
}
