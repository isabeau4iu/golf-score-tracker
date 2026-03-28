import axios from 'axios';

// Create a centralised Axios instance with the API base URL
// uses the environment variable if set, otherwise falls back to localhost for local development
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api'
});

// Attach the JWT token to every outgoing request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;