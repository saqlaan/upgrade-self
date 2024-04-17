/* eslint-disable no-useless-catch */
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createUserDoc, getUserDoc, updateUser } from "./collections/user";

export const signup = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const forgotPassword = (email: string) => {
  return auth().sendPasswordResetEmail(email);
};

export const onSignup = async () => {
  return sendEmailConfirmation();
};

export const sendEmailConfirmation = async () => {
  return await auth().currentUser?.sendEmailVerification();
};

export const syncDataOnAppStart = async (authUser: FirebaseAuthTypes.User) => {
  return updateUser(authUser);
};

export const updatePassword = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) => {
  const { email } = auth().currentUser as FirebaseAuthTypes.UserInfo;
  try {
    await auth().currentUser?.reauthenticateWithCredential(
      auth.EmailAuthProvider.credential(email || "", currentPassword),
    );
    await auth().currentUser?.updatePassword(newPassword);
  } catch (e) {
    throw e;
  }
};

export const onGoogleSignIn = async (user: FirebaseAuthTypes.User) => {
  const userDoc = await getUserDoc();
  if (!userDoc) {
    await createUserDoc(user);
  }
};
