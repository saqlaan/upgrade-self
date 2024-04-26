import axios from "../config/axiosConfig";

export type GuestPaymentMethod = {
  account_id: string;
  account_type: string;
  card_logo: string;
  created_date: string;
  created_date_iso: string;
  identifier: string;
  last_four: string;
  expiry_on: string;
};

export type GetGuestPaymentMethodsResponse = {
  accounts: GuestPaymentMethod[];
  has_expired_cards: boolean;
  error: any | null;
};

export const getGuestPaymentMethods = async ({
  guestId,
  centerId,
  countryCode,
}: {
  guestId: string;
  centerId: string;
  countryCode: string;
}): Promise<GetGuestPaymentMethodsResponse | null> => {
  try {
    const result = await axios.get(
      `zenoti/guests/${guestId}/accounts?centerId=${centerId}&countryCode=${countryCode}`,
    );
    return result.data as GetGuestPaymentMethodsResponse;
  } catch (error) {
    return null;
  }
};
