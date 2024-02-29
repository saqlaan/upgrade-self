import "dotenv/config";
import { getFirestore } from "firebase-admin/firestore";
import * as functions from "firebase-functions";

const firestore = getFirestore();

export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  const {
    uid,
    email,
    emailVerified,
    displayName,
    photoURL,
    phoneNumber,
    disabled,
  } = user;
  try {
    await firestore.collection("users").doc(uid).set({
      uid,
      email,
      emailVerified,
      displayName,
      photoURL,
      phoneNumber,
      disabled,
      onboardingCompleted: false,
    });
    console.log(`User ${uid} added to Firestore successfully.`);
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to add user to Firestore.",
    );
  }
  return null;
});
