import axios from "axios";

// Create an Axios instance with default configurations
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Request interceptor
instance.interceptors.request.use(
  async (config) => {
    let token = "";

    // Access token from Redux store
    /* if (config.url !== "/auth/token") { */
    token = localStorage.getItem("user-token");
    // console.log("token==>", token);

    // }

    // Attach token to Authorization header if available
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log("CONFIG AT INT", config);
    return config;
  },
  (error) => {
    // Handle request errors
    // console.log("ERROR 2 AT INT", error);
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    // console.log("RES AT INT", response);
    // Handle successful responses
    return response;
  },
  async (error) => {
    console.log("ERROR AT INT", error);
    // Handle error responses
    if (error.response) {
      if (error.response.status === 401) {
        try {
          
        } catch (e) {
          return Promise.reject(e);
        }
      }

      if (error.response.status === 403) {
        // TO BE ADDED ONCE LOGOUT FUNCTION IS DONE
        // Redirect or handle 403 error
      }

      return Promise.reject(error.response);
    } else if (error.request) {
      // Handle request errors (e.g., network errors)
      return Promise.reject({
        data: {
          message:
            "Request to the server failed. Please check your internet connection and try again.",
        },
      });
    } else {
      // Handle other errors
      return Promise.reject({
        data: {
          message:
            "Looks like the server is taking too long to respond, please try again sometime.",
        },
      });
    }
  }
);

export default instance;




