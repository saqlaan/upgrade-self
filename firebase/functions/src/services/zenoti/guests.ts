import axios from "../../config/axiosConfig";
import { Organization, requestHeaders } from "../../config/zenotiConfig";
import { GuestType } from "../../types";

export const guestSignup = async (
  user: GuestType,
  organization: Organization,
) => {
  try {
    return axios.post("/guests", user, {
      headers: requestHeaders[organization],
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
