import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

exports.processNewUser = functions.auth.user().onCreate((user) => {
  // Get user data
  // const uid = user.uid;
  const email = user.email;

  // Perform desired actions with the new user data
  console.log(`New user created: ${email}`);

  return null;
});
