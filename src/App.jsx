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


function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center py-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/register" element={<ProtectedRoute><RegisterForm /></ProtectedRoute> } />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/verify" element={<ProtectedRoute><VerifyPage /></ProtectedRoute> } />
        </Routes>
      </main>
    </>
  );
}

export default App;
