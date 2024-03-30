import "dotenv/config";
import { getFirestore } from "firebase-admin/firestore";
import * as functions from "firebase-functions";
import { signupUserInZenotiAsync } from "../app/controllers/guestController";
import { FirestoreUserType } from "../types";
import { getZenotiUserFromAllOrganizations } from "../services/zenoti";
import { updateUserCollectionDoc } from "../services/firebase/userCollection";
import { mapZenotiUserDataToFirestore } from "../utils";
import { createZenotiGuestDoc } from "../services/firebase/zenotiGuestsCollection";
const firestore = getFirestore();

export const onUserOnBoardingChanged = functions.firestore.document("users/{id}").onUpdate(async (change, context) => {
  const before = change.before.data() as FirestoreUserType;
  const after = change.after.data() as FirestoreUserType;
  if (!before.onboardingCompleted && after.onboardingCompleted && !after.existingZenotiUser) {
    await signupUserInZenotiAsync(after);
    await firestore
      .collection("users")
      .doc(change.before.id)
      .update({
        zenotiIntegration: {
          signedUp: true,
        },
      });
    console.log(`WoW onboarding is done!!! for ${context.auth?.uid}`);
  }
  if (!before.emailVerified && after.emailVerified) {
    const zenotiAccounts = await getZenotiUserFromAllOrganizations({ email: after.email });
    if (zenotiAccounts.length > 0) {
      const data = mapZenotiUserDataToFirestore(zenotiAccounts[0]);
      await updateUserCollectionDoc(after.uid, {
        ...data,
        zenotiIntegration: {
          signedUp: true,
        },
        centers: [
          {
            centerId: zenotiAccounts[0].center_id,
            countryCode: zenotiAccounts[0].countryCode,
          },
        ],
      });
    }
    // Pull the user center information and store into the firestore
    const guestAccounts = zenotiAccounts.map(({ center_id, id, countryCode }) => ({
      centerId: center_id,
      guestId: id || "",
      countryCode: countryCode,
    }));
    await createZenotiGuestDoc({
      guestAccounts,
      userId: after.uid,
    });

    console.log(`WoW zenoti user data updated!!! for ${context.auth?.uid}`);
  }
});
