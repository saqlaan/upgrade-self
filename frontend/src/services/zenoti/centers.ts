import { CenterType } from "@/types";
import axios from "../config/axiosConfig";
import { Routes } from "./routes";

export const fetchAllCentersData = async (): Promise<CenterType[] | null> => {
  try {
    const result = axios.get(Routes.centers);
    console.log((await result).headers);
    return (await result).data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
