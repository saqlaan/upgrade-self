import axios from "../../config/axiosConfig";
import { Organization, requestHeaders } from "../../config/zenotiConfig";
import { GuestType } from "../../types";
import { CountryCodes } from "../../types/enums/countryCode";

export const guestSignup = async (user: GuestType, organization: CountryCodes) => {
  return axios.post("/guests", user, {
    headers: requestHeaders[organization],
  });
};

type ZenotiGuestType = GuestType & {
  countryCode: CountryCodes;
};

type AddGuestPaymentParams = {
  countryCode: Organization;
  guestId: string;
  centerId: string;
};

export const updateGuest = async ({
  guestId,
  data,
  centerId,
}: {
  guestId: string;
  data: ZenotiGuestType;

  centerId: string;
}) => {
  return axios.put(
    `/guests/${guestId}`,
    { ...data, center_id: centerId },
    {
      headers: requestHeaders[data.countryCode],
    },
  );
};

export const addGuestPayment = async ({ countryCode, guestId, centerId }: AddGuestPaymentParams) => {
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

type GetZenotiUserFromAllOrganizationsResponseType = {
  guests: ZenotiGuestType[];
  page_Info: {
    total: number;
    page: number;
    size: number;
  };
};

export const getZenotiUserByEmail = async ({
  email,
  countryCode,
}: {
  email: string;
  countryCode: CountryCodes;
}): Promise<GetZenotiUserFromAllOrganizationsResponseType["guests"]> => {
  const result = await axios.get<GetZenotiUserFromAllOrganizationsResponseType>(
    `/guests/search?email=${encodeURIComponent(email)}`,
    {
      headers: requestHeaders[countryCode],
    },
  );
  return result?.data?.guests || null;
};

export const getZenotiUserFromAllOrganizations = async ({ email }: { email: string }): Promise<ZenotiGuestType[]> => {
  try {
    const guestZenotiAccounts: ZenotiGuestType[] = [];
    let guests = await getZenotiUserByEmail({ email, countryCode: CountryCodes.US });
    if (guests.length > 0) {
      guests = guests.map((item) => ({ ...item, countryCode: CountryCodes.US }));
      guestZenotiAccounts.push(...guests);
    }
    guests = await getZenotiUserByEmail({ email, countryCode: CountryCodes.CA });
    if (guests.length > 0) {
      guests = guests.map((item) => ({ ...item, countryCode: CountryCodes.CA }));
      guestZenotiAccounts.push(...guests);
    }
    return guestZenotiAccounts;
  } catch (e) {
    throw e;
  }
};

export const fetchGuestPaymentMethods = async ({ countryCode, guestId, centerId }: AddGuestPaymentParams) => {
  const result = await axios.get(`/guests/${guestId}/accounts?center_id=${centerId}`, {
    headers: requestHeaders[countryCode],
  });
  return result.data;
};
