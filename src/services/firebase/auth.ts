import auth from "@react-native-firebase/auth";

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
