import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000, // Set the timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
