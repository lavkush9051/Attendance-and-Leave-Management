// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { LeaveRequestsProvider } from './context/LeaveRequestsContext';
import { AttendanceRequestsProvider } from './context/AttendanceRequestsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <AttendanceRequestsProvider>
        <LeaveRequestsProvider>
          <App />
        </LeaveRequestsProvider>
      </AttendanceRequestsProvider>
    </AuthProvider>
  </BrowserRouter>
);

