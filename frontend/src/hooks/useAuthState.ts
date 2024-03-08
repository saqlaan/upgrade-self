import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect, useState } from "react";

export const useAuthState = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  async function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    console.log("Authuser: ", user);
    setUser(user);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return {
    user,
  };
};
