import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
