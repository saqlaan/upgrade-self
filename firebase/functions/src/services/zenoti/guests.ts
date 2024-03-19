import axios from "../../config/axiosConfig";
import { Organization, requestHeaders } from "../../config/zenotiConfig";
import { GuestType } from "../../types";
import { CountryCodes } from "../../types/enums/countryCode";

export const guestSignup = async (
  user: GuestType,
  organization: Organization,
) => {
  return axios.post("/guests", user, {
    headers: requestHeaders[organization],
  });
};

type AddGuestPaymentParams = {
  countryCode: CountryCodes;
  guestId: string;
  centerId: string;
};

export const addGuestPayment = async ({
  countryCode,
  guestId,
  centerId,
}: AddGuestPaymentParams) => {
  return axios.post(
    `/guests/${guestId}/accounts`,
    {
      center_id: centerId,
    },
    {
      headers: requestHeaders[countryCode],
    },
  );
};
