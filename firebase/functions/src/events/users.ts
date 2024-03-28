import "dotenv/config";
import { getFirestore } from "firebase-admin/firestore";
import * as functions from "firebase-functions";
import { signupUserInZenotiAsync } from "../app/controllers/guestController";
import { FirestoreUserType } from "../types";
const firestore = getFirestore();

export const onUserOnBoardingChanged = functions.firestore
  .document("users/{id}")
  .onUpdate(async (change, context) => {
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
    if (!before.emailVerified && !after.emailVerified) { }
  });
