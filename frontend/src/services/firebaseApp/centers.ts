import axios from "../config/axiosConfig";
import { Routes } from "./routes";
import { CenterType } from "@/types";

export const fetchAllCentersData = async (): Promise<CenterType[] | null> => {
  try {
    const result = axios.get(Routes.centers);
    return (await result).data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
