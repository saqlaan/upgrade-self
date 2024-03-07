import { COLLECTIONS, UserType } from "@/types";
import { FirebaseAuthTypes, firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const getUser = async (): Promise<UserType | undefined> => {
  const { uid } = firebase.auth().currentUser as FirebaseAuthTypes.User;
  const userDoc = await firestore()
    .collection(COLLECTIONS.users)
    .doc(uid)
    .get();
  if (userDoc.exists) {
    return userDoc.data() as UserType;
  }
  return undefined;
};
