// import React, { useState } from 'react';
// import axios from 'axios';
// import '../signup/Form.css';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/login', {
//         username: form.username,
//         password: form.password,
//       });

//       if (response.data && response.data.access_token) {
//         // Save token to localStorage (or cookie)
//         localStorage.setItem('token', response.data.access_token);
//         alert('Login successful!');
//         navigate('/dashboard');
//       } else {
//         setError('Invalid response from server');
//       }
//     } catch (err) {
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Enter username"
//           value={form.username}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Enter password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Login</button>
//         {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
//       </form>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/login", form);
//       alert(`Login successful! Welcome, ${response.data.user}`);
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.response?.data?.detail || 'Invalid credentials.');
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Enter username"
//           value={form.username}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Enter password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Login</button>
//         {error && <div style={{ color: "red" }}>{error}</div>}
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../signup/Form.css';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', {
        username: form.username,
        password: form.password,
      });
      login(response.data.token); // Save token in context & localStorage
      navigate('/dashboard');
    } catch (error) {
      alert("Login failed: " + error.response.data.detail);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

