import axios from "axios";

const instance = axios.create({
  baseURL: "https://apiusa.lookinbody.com",
  timeout: 5000, // Set the timeout for requests
  headers: {
    "Content-Type": "application/json",
    Account: "patagonademo",
  },
});

export default instance;
