import * as functions from "firebase-functions";
import { getFirestore } from "firebase-admin/firestore";
import { UserRecord } from "firebase-functions/v1/auth";
import 'dotenv/config'

const firestore = getFirestore()

export const onUserCreated = functions.auth.user().onCreate(async (user: UserRecord) => {
  const {uid, email, emailVerified, displayName, photoURL, phoneNumber, disabled, } = user
  console.log(`New user created: ${email}`);
  try {
    await firestore.collection('users').doc(user.uid).set({
        uid, email, emailVerified, displayName, photoURL, phoneNumber, disabled
    })
} catch (error) {
  console.log(error)
}
  return null;
});
