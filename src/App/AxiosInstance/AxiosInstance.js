import axios from "axios";
import store from "../../ReduxToolkit/Store.jsx";
import { showLoader, hideLoader } from "../../ReduxToolkit/Store.jsx";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000",
});

axiosInstance.interceptors.request.use(
  function (config) {
    console.log("Request URL:", config.baseURL + config.url);
    console.log("Token:", localStorage.getItem("token"));
    store.dispatch(showLoader());

    // Add global params (optional, currently empty)
    config.params = {
      ...(config.params || {}),
    };

    // Example token (better to fetch from localStorage/sessionStorage)
    const mytoken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YjRiNDc3NTllYzEyMGFjMGQzMGMyYSIsImlhdCI6MTc1OTYwMzM2OSwiZXhwIjoxNzU5Njg5NzY5fQ.poqHM9NQQlecOP4mwvVmNv-L6s8zcPeBfcSecTbdDE8";//localStorage.getItem("token");
    
    if (mytoken) {
      config.headers["Authorization"] = `Bearer ${mytoken}`;
    } else {
      console.warn("No token found in localStorage");
    }
    return config;
  },
  function (error) {
    store.dispatch(hideLoader());
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    store.dispatch(hideLoader());
    return response;
  },
  function (error) {
    store.dispatch(hideLoader());
    console.error("API error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);
