import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { updateAuthorizationToken } from "@/services/config/axiosConfig";

export const useAuthState = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  async function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (user) {
      const token = (await auth().currentUser?.getIdToken()) || "";
      updateAuthorizationToken(token);
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return {
    user,
  };
};
