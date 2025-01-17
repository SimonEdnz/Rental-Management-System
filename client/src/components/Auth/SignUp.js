import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'tenant', // Default role
  });
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/register', formData);
      alert('Sign Up Successful! Redirecting to dashboard...');
      const role = response.data.role;

      // Navigate to the respective dashboard based on the role
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'manager') {
        navigate('/manager/dashboard');
      } else if (role === 'tenant') {
        navigate('/tenant/dashboard');
      }
    } catch (error) {
      console.error('Sign Up Error:', error.response?.data || error.message);
      alert('Error during sign-up. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
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
    </div>
  );
};

export default SignUp;
