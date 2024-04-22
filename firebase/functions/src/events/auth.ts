import "dotenv/config";
import { getFirestore } from "firebase-admin/firestore";
import * as functions from "firebase-functions";
import handleExistingZenotiUser from "../eventsHandler/handleExistingZenotiUser";
import { FirestoreUserType } from "../types";

const firestore = getFirestore();

export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  const { uid, email, emailVerified, displayName, photoURL, phoneNumber, disabled } = user;
  try {
    await firestore
      .collection("users")
      .doc(uid)
      .set({
        uid,
        email,
        emailVerified,
        displayName,
        photoURL,
        phoneNumber,
        disabled,
        onboardingCompleted: false,
        zenotiIntegration: {
          signedUp: false,
        },
      });
    if (emailVerified) {
      handleExistingZenotiUser(null, user as unknown as FirestoreUserType);
    }
    console.log(`User ${uid} added to Firestore successfully.`);
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    throw new functions.https.HttpsError("internal", "Failed to add user to Firestore.");
  }
  return null;
});
