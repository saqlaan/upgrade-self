import { getFirestore } from "firebase-admin/firestore";
import { signupUserInZenotiAsync } from "../app/controllers/guestController";
import { FirestoreUserType } from "../types";
const firestore = getFirestore();

export default async function handleNewUserAfterOnboarding(before: FirestoreUserType, after: FirestoreUserType) {
  await signupUserInZenotiAsync(after);
  await firestore
    .collection("users")
    .doc(before.uid)
    .update({
      zenotiIntegration: {
        signedUp: true,
      },
    });
  console.log(`WoW zenoti user data updated!!! for`);
}
