import { CButton } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import { UseUserStore } from "@/store/user.store";
import type { ApplicationScreenProps } from "@/types/navigation";
import auth from "@react-native-firebase/auth";
import React from "react";

function Home({ navigation }: ApplicationScreenProps) {
  const { clearUser } = UseUserStore();

  const handleLogout = () => {
    auth().signOut();
    clearUser();
  };

  return (
    <SafeScreen>
      <CButton onPress={handleLogout}>Logout</CButton>
    </SafeScreen>
  );
}

export default Home;
