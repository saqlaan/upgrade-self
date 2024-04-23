import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "./useAuthState";
import { COLLECTIONS, FirestoreUser } from "@/types";
import { useUserStore } from "@/store/userStore";
import { useCenterStore } from "@/store/centerStore";

export const useFirebaseSnapshots = () => {
  const { updateUser } = useUserStore();
  const { setCenter } = useCenterStore();
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
    if (documentSnapShot?.exists) {
      const user = documentSnapShot.data() as FirestoreUser;
      updateUser(user);
      if (user.centers && user.centers.length > 0) {
        setCenter(user.centers[0]);
      }
    }
  };

  return {};
};
