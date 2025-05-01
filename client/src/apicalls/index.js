import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,   //change for mobile hosting added ip addres instead of localhost
  headers: {
    credentials: "include",
    'Content-Type': 'application/json',
  }
});

// Add an interceptor to dynamically set the Authorization header on each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);