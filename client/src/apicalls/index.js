import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",   //change for mobile hosting added ip addres instead of localhost
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