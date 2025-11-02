import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`, // 🟢 change this to your Render backend URL
});

// Attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
