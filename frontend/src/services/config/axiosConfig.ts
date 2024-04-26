import axios from "axios";
import auth from "@react-native-firebase/auth";

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async function (config) {
    const token = await auth().currentUser?.getIdToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Handle request errors
    return Promise.reject(error);
  },
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
  },
);

export default instance;
