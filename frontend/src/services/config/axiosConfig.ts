import { Organization } from "@/types";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const requestHeaders = {
  [Organization.US]: { Authorization: `apikey ${process.env.API_KEY_US}` },
  [Organization.CANADA]: {
    Authorization: `apikey ${process.env.API_KEY_CANADA}`,
  },
};

export default instance;
