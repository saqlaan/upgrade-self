import "dotenv/config";
import * as functions from "firebase-functions";
import _, { pick } from "lodash";
import handleExistingZenotiUser from "../../eventsHandler/handleExistingZenotiUser";
import handleNewUserAfterOnboarding from "../../eventsHandler/handleNewUserAfterOnboarding";
import handleProfileUpdates from "../../eventsHandler/handleProfileUpdates";
import { FirestoreUserType } from "../../types";

export const onUserOnBoardingChanged = functions.firestore.document("users/{id}").onUpdate(async (change, context) => {
  const before = change.before.data() as FirestoreUserType;
  const after = change.after.data() as FirestoreUserType;
  // On email verification
  if (!before.emailVerified && after.emailVerified) {
    await handleExistingZenotiUser(before, after);
    console.log(`WoW zenoti user data updated!!! for ${context.auth?.uid}`);
  }
  // On onboarding completion
  if (!before.onboardingCompleted && after.onboardingCompleted && !after.zenotiIntegration?.signedUp) {
    await handleNewUserAfterOnboarding(before, after);
    console.log(`WoW onboarding is done!!! for ${context.auth?.uid}`);
  }
  // On profile update
  const keys = ["firstName", "lastName", "state", "zipcode", "city", "address1", "address2", "phone"];
  if (!_.isEqual(pick(before, keys), pick(after, keys))) {
    handleProfileUpdates(before, after);
    console.log("User fields have changed:", before.firstName, after.lastName);
  }
});
