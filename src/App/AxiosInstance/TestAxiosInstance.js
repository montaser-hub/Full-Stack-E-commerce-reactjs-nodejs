import axios from "axios";
import store from "../../ReduxToolkit/Store.jsx";
import { showLoader, hideLoader } from "../../ReduxToolkit/Store.jsx";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000",
});

// Request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Show loader before request
    store.dispatch(showLoader());

    // Add global params (optional, currently empty)
    config.params = {
      ...(config.params || {}),
    };

    // Retrieve token dynamically from localStorage
    const mytoken = localStorage.getItem("token");
    if (mytoken) {
      config.headers["Authorization"] = `Bearer ${mytoken}`;
    }

    return config;
  },
  function (error) {
    store.dispatch(hideLoader());
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Hide loader after success
    store.dispatch(hideLoader());
    return response;
  },
  function (error) {
    // Hide loader after error
    store.dispatch(hideLoader());
    // Redirect to login on 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // Clear invalid token
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
