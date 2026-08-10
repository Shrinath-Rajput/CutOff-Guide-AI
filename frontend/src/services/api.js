import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendOtp = async (payload) => {
  const response = await api.post('/api/auth/send-otp', payload);
  return response.data;
};

export const verifyOtp = async (payload) => {
  const response = await api.post('/api/auth/verify-otp', payload);
  return response.data;
};

export const registerUser = async (user) => {
  const response = await api.post('/api/auth/register', user);
  return response.data;
};

export const loginUser = async (user) => {
  const response = await api.post('/api/auth/login', user);
  return response.data;
};

export const googleAuth = async (user) => {
  const response = await api.post('/api/auth/google', user);
  return response.data;
};
