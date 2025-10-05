import axios from "axios";
import store from "../../ReduxToolkit/Store.jsx";
import { showLoader, hideLoader } from "../../ReduxToolkit/Store.jsx";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    // console.log("Request URL:", config.baseURL + config.url);
    store.dispatch(showLoader());
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
    // console.log("Response Cookies:", document.cookie);

    store.dispatch(hideLoader());
    return response;
  },
  function (error) {
    // console.error("Response Cookies:", document.cookie);
    store.dispatch(hideLoader());
    console.error("API error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);
