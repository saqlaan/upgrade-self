import axios from "../../config/inbodyAxiosConfig";
import { INBODY_API_KEY } from "../../config/secrets";

type InbodyUserType = {
  name: string;
  iD: string;
  phone: string; // numbers
  gender: "M" | "F";
  age: string; // numbers
  height: string; // cm
  birthDay: string; // yyyy-mm-dd
};

export const createInbodyUser = async (user: InbodyUserType) => {
  const inbodyApiKey = INBODY_API_KEY.value();
  return axios
    .post("/user/InsertUser", user, { headers: { "API-KEY": inbodyApiKey } })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error calling function:", error);
      return error;
    });
};
