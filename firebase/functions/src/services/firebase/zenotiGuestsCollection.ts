import "dotenv/config";
import { getFirestore } from "firebase-admin/firestore";
import { FirestoreZenotiGuestType } from "../../types";
const firestore = getFirestore();

export const createZenotiGuestDoc = async (data: FirestoreZenotiGuestType) => {
  return await firestore.collection("zenotiGuests").doc().create(data);
};
