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
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
//    localStorage.setItem('username', form.username);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username')
    setIsAuthenticated(false);
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
      setAttendanceLog
    }}>
      {children}
    </AuthContext.Provider>
  );
}
