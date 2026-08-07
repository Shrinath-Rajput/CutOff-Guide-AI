import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (user) => {
  const response = await api.post('/api/auth/register', user);
  return response.data;
};
