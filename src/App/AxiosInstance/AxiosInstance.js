import axios from "axios";
import store from "../../ReduxToolkit/Store.jsx";
import { showLoader, hideLoader } from "../../ReduxToolkit/Store.jsx";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
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

    // Example token (better to fetch from localStorage/sessionStorage)
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
    return Promise.reject(error);
  }
);
