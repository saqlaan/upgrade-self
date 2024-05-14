import axios from "../config/axiosConfig";
import { Routes } from "./routes";
import { CenterType } from "@/types";

export const fetchAllCentersData = async (): Promise<CenterType[] | null> => {
  try {
    const result = axios.get(Routes.centers);
    return (await result).data;
  } catch (error) {
    console.log({ axios });
    console.log({ error });
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser
      // and an instance of http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log(error);
    }
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
