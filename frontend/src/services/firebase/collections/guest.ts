import { FirebaseAuthTypes, firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { COLLECTIONS } from "@/types";

type GetUserGuestsResponse = {
  userId: string;
  guestAccounts: {
    centerId: string;
    countryCode: string;
    guestId: string;
  }[];
};

export const getUserGuests =
  async (): Promise<GetUserGuestsResponse | null> => {
    const { uid } = firebase.auth().currentUser as FirebaseAuthTypes.User;

    const querySnapshot = await firestore()
      .collection(COLLECTIONS.zenotiGuests)
      .where("userId", "==", uid)
      .limit(1)
      .get();
    if (querySnapshot) {
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data() as GetUserGuestsResponse;
      } else {
        console.log("No document found with the specified userid.");
      }
    }
    return null;
  };
