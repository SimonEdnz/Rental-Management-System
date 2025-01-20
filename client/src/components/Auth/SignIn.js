import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import './SignIn.css'; // Styling

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(''); // Reset error before making the request

    try {
      const response = await api.post('/login', { email, password });

      // Store JWT token in localStorage
      localStorage.setItem('authToken', response.data.token);

      const { role } = response.data.user;

      // Redirect based on user role
      if (role === 'admin') {
        navigate('/Dashboard/AdminDashboard');
      } else if (role === 'manager') {
        navigate('/Dashboard/ManagerDashboard');
      } else {
        navigate('/Dashboard/TenantDashboard');
      }
    } catch (error) {
      console.error('Sign In Error:', error.response?.data || error.message);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <p className="register-link">
        Don't have an account? <a href="/SignUp">Register</a>
      </p>
    </div>
  );
};

export default SignIn;
