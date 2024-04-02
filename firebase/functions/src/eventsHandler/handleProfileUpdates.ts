import { getFirestore } from "firebase-admin/firestore";
import { updateGuest } from "../services/zenoti";
import { FirestoreUserType, FirestoreZenotiGuestType } from "../types";
import { CountryCodes } from "../types/enums/countryCode";
import { mapFirebaseUserToZenotiGuest } from "../utils";
const firestore = getFirestore();

export default async function handleProfileUpdates(before: FirestoreUserType, after: FirestoreUserType) {
  try {
    const query = await firestore.collection("zenotiGuests").where("userId", "==", before.uid).limit(1);
    const querySnapshot = await query.get();
    const updatedData = mapFirebaseUserToZenotiGuest(after);
    let promises = [];
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data() as FirestoreZenotiGuestType;
      promises = data.guestAccounts.map((guestAccount) => {
        updateGuest({
          guestId: guestAccount.guestId,
          data: { ...updatedData, countryCode: guestAccount.countryCode as CountryCodes },
          centerId: guestAccount.centerId,
        });
      });
      return await Promise.all(promises);
    }
    console.log(`WoW profile updates handled`);
    return null;
  } catch (e) {
    console.log(`Something went wrong while updating the profile on zenoti ${e}`);
    throw e;
  }
}
