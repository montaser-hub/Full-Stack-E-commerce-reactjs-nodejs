import axios from "axios";
import store from "../../ReduxToolkit/Store.jsx";
import {  hideLoader } from "../../ReduxToolkit/Store.jsx";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.params = {
      ...(config.params || {}),
    };
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
