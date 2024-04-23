import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { updateAuthorizationToken } from "@/services/config/axiosConfig";
import { useUserStore } from "@/store/userStore";

export const useAuthState = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const { clearUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  async function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (user) {
      const token = (await auth().currentUser?.getIdToken()) || "";
      updateAuthorizationToken(token);
    } else {
      clearUser();
    }
    setIsLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return {
    user,
    isLoading,
  };
};
