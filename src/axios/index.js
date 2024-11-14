import axios, { AxiosResponse } from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`, // Your base URL here
  timeout: 10000, // Request timeout in milliseconds
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // For example, add an authorization header
    const token = localStorage.getItem("user-token");
    if (token) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    if (config.data instanceof FormData) {
      // Automatically set the 'Content-Type' header to 'multipart/form-data'
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response before it is returned
    return response;
  },
  (error) => {
    // Handle response error
    switch (error.response.status) {
      case 401: {
        // "Login required"
        console.error("Unauthorized access - Redirecting to login");
        break;
      }
      case 403: {
        // "Permission denied"
        break;
      }
      case 404: {
        // "Invalid request"
        break;
      }
      case 500: {
        // "Server error"
        break;
      }
      default: {
        // "Unknown error occurred"
        break;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
