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

type AddGuestPaymentAsync = {
  guestId: string;
  centerId: string;
  countryCode: string;
};

export const addGuestPaymentAsync = async ({
  guestId,
  centerId,
  countryCode,
}: AddGuestPaymentAsync) => {
  try {
    const result = axios.post(Routes.addPayment, {
      guestId,
      centerId,
      countryCode,
    });
    return await result;
  } catch (error) {
    return null;
  }
};
