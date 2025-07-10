// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import RegisterForm from "./pages/RegisterForm";
import VerifyPage from "./pages/VerifyPage";
import Login from "./pages/login/login";
import Signup from "./pages/signup/Signup";
import ProtectedRoute from "./components/ProtectedRoutes";
import Dashboard from "./pages/dashboard/Dashboard";
import LeaveManagement from "./pages/leave-management/LeaveManagement";
import Layout from "./components/Layout/Layout";
import UserProfile from "./pages/UserProfile/UserProfile";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import { LeaveRequestsProvider } from "../src/context/LeaveRequestsContext";
import { AttendanceRequestsProvider } from "../src/context/AttendanceRequestsContext";
import ReportingLevel from "./pages/ReportingLevel/ReportingLevel";
import PayrollAndTaxCenter from "./pages/PayrollAndTaxCenter/PayrollAndTaxCenter";





function App() {
  return (
    <>
      <LeaveRequestsProvider>
        <Navbar />
        <main className="min-h-screen bg-gray-100 flex flex-col items-center py-4">
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/register" element={<ProtectedRoute><RegisterForm /></ProtectedRoute> } />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
              <Route path="/verify" element={<ProtectedRoute><VerifyPage /></ProtectedRoute> } />
              <Route path="/leave-management" element={<LeaveManagement />} />
              <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><AdminPanel/></ProtectedRoute>} />
              <Route path="/reporting-level" element={<ProtectedRoute><ReportingLevel /></ProtectedRoute>} />
              <Route path="/payroll-taxcenter" element={<ProtectedRoute><PayrollAndTaxCenter /></ProtectedRoute>} />
              {/* Add more routes as needed */}
            </Routes>
          </Layout>
        </main>
      </LeaveRequestsProvider>
    </>
  );
}

export default App;
