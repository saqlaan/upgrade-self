import { FirebaseAuthTypes, firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { COLLECTIONS, UserType } from "@/types";

export const getUser = async (): Promise<UserType | undefined> => {
  const { uid, emailVerified } = firebase.auth()
    .currentUser as FirebaseAuthTypes.User;

  const userDoc = await firestore()
    .collection(COLLECTIONS.users)
    .doc(uid)
    .get();
  if (userDoc.exists) {
    return { ...userDoc.data(), emailVerified } as UserType;
  }
  return undefined;
};

export const updateUser = async (data: UserType): Promise<void> => {
  const { uid } = firebase.auth().currentUser as FirebaseAuthTypes.User;
  return await firestore().collection(COLLECTIONS.users).doc(uid).update(data);
};
