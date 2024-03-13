import "dotenv/config";
import * as functions from "firebase-functions";
import { signupUserInZenoti } from "../app/controllers/zenotiController";
import { FirestoreUserType } from "../types";

export const onUserDocumentChange = functions.firestore
  .document("users/{id}")
  .onUpdate(async (change, context) => {
    const before = change.before.data() as FirestoreUserType;
    const after = change.after.data() as FirestoreUserType;
    if (!before.onboardingCompleted && after.onboardingCompleted) {
      await signupUserInZenoti(after);
      console.log(`WoW onboarding is done!!! for ${context.auth?.uid}`);
    }
  });
