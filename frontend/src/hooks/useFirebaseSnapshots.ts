import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "./useAuthState";
import { COLLECTIONS } from "@/types";
import { useUserStore } from "@/store/user.store";

export const useFirebaseSnapshots = () => {
  const { updateUser } = useUserStore();
  const { user } = useAuthState();

  useEffect(() => {
    let userSubscriber = null;
    if (user?.uid) {
      userSubscriber = firestore()
        .collection(COLLECTIONS.users)
        .doc(user?.uid)
        .onSnapshot(handleUserSnapshot);
    }
    return () => {
      userSubscriber && userSubscriber();
    };
  }, [user]);

  const handleUserSnapshot = (
    documentSnapShot: FirebaseFirestoreTypes.DocumentSnapshot,
  ) => {
    if (documentSnapShot?.exists) updateUser(documentSnapShot.data());
  };

  return {};
};
