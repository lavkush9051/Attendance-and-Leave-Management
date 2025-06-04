// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import RegisterForm from "./pages/RegisterForm";
import VerifyPage from "./pages/VerifyPage";
import Login from "./pages/login/login";
import Signup from "./pages/signup/Signup";


function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/verify" />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/verify" element={<VerifyPage />} />
          {<Route path="/login" element={<Login />} /> }
          {<Route path="/signup" element={<Signup />} />}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
