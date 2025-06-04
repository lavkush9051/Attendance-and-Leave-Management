// src/components/Header.jsx
// import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// export default function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-md">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
//         {/* Logo or App Name */}
//         <Link to="/" className="text-2xl font-bold text-white hover:text-blue-100 transition">
//           FaceAttend
//         </Link>

//         {/* Desktop Nav Links */}
//         <div className="hidden md:flex gap-6 items-center text-white font-medium">
//           <NavLink to="/register" className={({ isActive }) => isActive ? "underline underline-offset-4" : "hover:text-blue-200"}>
//             Register
//           </NavLink>
//           <NavLink to="/verify" className={({ isActive }) => isActive ? "underline underline-offset-4" : "hover:text-blue-200"}>
//             Verify
//           </NavLink>
//           <NavLink to="/login" className={({ isActive }) => isActive ? "underline underline-offset-4" : "hover:text-blue-200"}>
//             Login
//           </NavLink>
//           <NavLink to="/signup" className={({ isActive }) => isActive ? "underline underline-offset-4" : "hover:text-blue-200"}>
//             Signup
//           </NavLink>
//           <button className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition">
//             Logout
//           </button>
//         </div>

//         {/* Mobile menu button */}
//         <button
//           className="md:hidden text-white"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-blue-600 text-white px-4 pb-4 flex flex-col gap-2 transition-all duration-300 ease-in-out">
//           <NavLink
//             to="/register"
//             className="py-2 border-b border-blue-500 hover:bg-blue-700 transition"
//             onClick={() => setMenuOpen(false)}
//           >
//             Register
//           </NavLink>
//           <NavLink
//             to="/verify"
//             className="py-2 border-b border-blue-500 hover:bg-blue-700 transition"
//             onClick={() => setMenuOpen(false)}
//           >
//             Verify
//           </NavLink>
//           <NavLink
//             to="/login"
//             className="py-2 border-b border-blue-500 hover:bg-blue-700 transition"
//             onClick={() => setMenuOpen(false)}
//           >
//             Login
//           </NavLink>
//           <NavLink
//             to="/signup"
//             className="py-2 border-b border-blue-500 hover:bg-blue-700 transition"
//             onClick={() => setMenuOpen(false)}
//           >
//             Signup
//           </NavLink>
//           <button className="py-2 bg-red-600 hover:bg-red-700 rounded transition" onClick={() => setMenuOpen(false)}>
//             Logout
//           </button>
//         </div>
//       )}
//     </nav>

//   );

// }

// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // we will create this file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">JNPT</div>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/verify">Verify</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

