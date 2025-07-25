import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  const [isClockedIn, setIsClockedIn] = useState(() => {
    return localStorage.getItem("isClockedIn") === "true";
  });
  const [attendanceLog, setAttendanceLog] = useState([]);

  const [employee, setEmployee] = useState(() => {
    const stored = localStorage.getItem("employee");
    return stored ? JSON.parse(stored) : null;
  });

  const clockIn = () => {
    setIsClockedIn(true);
    localStorage.setItem("isClockedIn", "true");
     setAttendanceLog(prev => [
      ...prev,
      {
        type: "IN",
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const clockOut = () => {
    setIsClockedIn(false);
    localStorage.setItem("isClockedIn", "false");
    setAttendanceLog(prev => [
      ...prev,
      {
        type: "OUT",
        timestamp: new Date().toISOString()
      }
    ]);
  };

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
    const emp = localStorage.getItem("employee");
    if (emp) setEmployee(JSON.parse(emp));
  }, []);

  const login = async (token, emp) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setEmployee(emp);
    localStorage.setItem('employee', JSON.stringify(emp));

    // Fetch employee info right after login
    // try {
    //   const res = await fetch(`http://127.0.0.1:8000/api/employee/${emp_id}`, {
    //     headers: { Authorization: `Bearer ${token}` }
    //   });
    //   if (res.ok) {
    //     const emp = await res.json();
    //     setEmployee(emp);
    //     localStorage.setItem("employee", JSON.stringify(emp));
    //   } else {
    //     setEmployee(null);
    //   }
    // } catch (err) {
    //   setEmployee(null);
    // }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('employee');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setEmployee(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      isClockedIn, 
      clockIn, 
      clockOut, 
      attendanceLog, 
      setAttendanceLog,
      employee,
      setEmployee
    }}>
      {children}
    </AuthContext.Provider>
  );
}
