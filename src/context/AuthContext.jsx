import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  const [isClockedIn, setIsClockedIn] = useState(() => {
    return localStorage.getItem("isClockedIn") === "true";
  });

  const clockIn = () => {
    setIsClockedIn(true);
    localStorage.setItem("isClockedIn", "true");
  };

  const clockOut = () => {
    setIsClockedIn(false);
    localStorage.setItem("isClockedIn", "false");
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isClockedIn, clockIn, clockOut}}>
      {children}
    </AuthContext.Provider>
  );
}
