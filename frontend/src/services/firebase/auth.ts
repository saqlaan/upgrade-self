import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { updateUser } from "./collections/user";

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
