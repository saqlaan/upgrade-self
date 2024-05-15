import Snackbar from "react-native-snackbar";

import { useMutation } from "@tanstack/react-query";
import { colors } from "@/theme";
import { addGuestPaymentAsync } from "@/services/firebaseApp/centers";
import { getUser } from "@/services/firebase";
import { getUserGuests } from "@/services/firebase/collections/guest";

export const usePayment = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: addGuestPaymentAsync,
  });

  const addPaymentMethod = async () => {
    try {
      const user = await getUser();
      const { centers } = user;
      const center = centers[0];
      const guestInfo = await getUserGuests();
      if (guestInfo) {
        const { guestAccounts } = guestInfo;
        const guestAccount = guestAccounts.find(
          (guestAccount) => guestAccount.centerId == center.centerId
        );
        if (!guestAccount) {
          console.log("Account not availble");
          return;
        }
        const request = await mutateAsync(guestAccount);

        if (request?.data?.error) {
          Snackbar.show({
            text: "Error",
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: "Something went wrong try later",
              textColor: colors.error,
            },
          });
          return;
        }
        if (!request) {
          Snackbar.show({
            text: "Error",
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: "Something went wrong try later",
              textColor: colors.error,
            },
          });
          return;
        }
        const { hosted_payment_uri: hostedPaymentUri } = request?.data;
        return hostedPaymentUri;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    addPaymentMethod,
  };
};
