import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'tenant', // Default role
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state before making the request

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      alert('Sign Up Successful!');
      const role = response.data.role;

      // Navigate to the respective dashboard based on the role
      if (role === 'admin') {
        navigate('/Dashboard/AdminDashboard');
      } else if (role === 'manager') {
        navigate('/Dashboard/ManagerDashboard');
      } else if (role === 'tenant') {
        navigate('/Dashboard/TenantDashboard');
      }
    } catch (error) {
      console.error('Sign Up Error:', error.response?.data || error.message);
      setError(error.response?.data || 'Error during sign-up. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="tenant">Tenant</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
      <p className="sign-in-link">
        Already have an account? <a href="/signin">Sign In</a>
      </p>
    </div>
  );
};

export default SignUp;
