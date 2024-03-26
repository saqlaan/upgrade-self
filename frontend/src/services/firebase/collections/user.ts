import { FirebaseAuthTypes, firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { COLLECTIONS, FirestoreUser } from "@/types";

export const getUser = async (): Promise<FirestoreUser | null> => {
  const { uid, emailVerified } = firebase.auth()
    .currentUser as FirebaseAuthTypes.User;

  const userDoc = await firestore()
    .collection(COLLECTIONS.users)
    .doc(uid)
    .get();
  if (userDoc.exists) {
    return { ...userDoc.data(), emailVerified } as FirestoreUser;
  }
  return null;
};

export const updateUser = async (data: FirestoreUser): Promise<void> => {
  const { uid } = firebase.auth().currentUser as FirebaseAuthTypes.User;
  return await firestore().collection(COLLECTIONS.users).doc(uid).update(data);
};

export const syncUserDataOnSignIn = async () => {
  const { emailVerified, uid } = firebase.auth()
    .currentUser as FirebaseAuthTypes.User;
  const userDoc = await firestore()
    .collection(COLLECTIONS.users)
    .doc(uid)
    .get();
  if (userDoc.exists) {
    const { emailVerified: docEmailVerification } =
      userDoc.data() as FirestoreUser;

    if (emailVerified && !docEmailVerification) {
      await updateUser({
        emailVerified: true,
      });
    }
  }
};
