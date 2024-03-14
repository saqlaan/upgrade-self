import { Organization } from "@/types";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    // Log the request before sending
    // console.log("Request:", config);
    // Optionally, modify the request configuration
    return config;
  },
  function (error) {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Log the response after receiving
    // console.log("Response:", response);
    // Optionally, modify the response data
    return response;
  },
  function (error) {
    // Handle response errors
    return Promise.reject(error);
  }
);

export const updateAuthorizationToken = (token: string) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const requestHeaders = {
  [Organization.US]: { Authorization: `apikey ${process.env.API_KEY_US}` },
  [Organization.CANADA]: {
    Authorization: `apikey ${process.env.API_KEY_CANADA}`,
  },
};

export default instance;
