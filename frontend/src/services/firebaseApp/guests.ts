import axios from "../config/axiosConfig";

type GetGuestPaymentMethodsResponse = {
  accounts: [];
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
