// import React, { useState } from 'react';
// import axios from 'axios';
 import './Form.css';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       // Adjust keys if your backend expects different field names
//       const response = await axios.post('http://127.0.0.1:8000/signup', {
//         username: user.username,
//         password: user.password,
//         // If your backend uses email, include it, otherwise remove/comment
//         //email: user.email,
//       });

//       if (response.data && response.data.status === "success") {
//         setSuccess("Signup successful! You can now login.");
//         setTimeout(() => navigate('/login'), 1500); // Redirect after a short delay
//       } else {
//         setError(response.data.detail || "Signup failed.");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.detail ||
//         "Signup failed. The username might be taken or there was a server error."
//       );
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Enter username"
//           value={user.username}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Enter email"
//           value={user.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Enter password"
//           value={user.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Signup</button>
//         {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
//         {success && <div style={{ color: 'green', marginTop: '1rem' }}>{success}</div>}
//       </form>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post("http://127.0.0.1:8000/signup", user);
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(error.response.data.detail || "Signup failed!");
      setError(err.response?.data?.detail || 'Signup failed.');
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
};

export default Signup;

