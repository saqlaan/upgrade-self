import auth from "@react-native-firebase/auth";
import React from "react";
import { Box, CButton } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import { UseUserStore } from "@/store/user.store";
import type { ApplicationScreenProps } from "@/types/navigation";

function Home({ navigation }: ApplicationScreenProps) {
  const { clearUser } = UseUserStore();

  const handleLogout = () => {
    auth().signOut();
    clearUser();
  };

  const navigateToPayment = () => {
    navigation.navigate("PaymentScreen");
  };

  const navigateToProfile = () => {
    navigation.navigate("ProfileScreen");
  };

  return (
    <SafeScreen>
      <Box flex={1} alignItems="center" justifyContent="center">
        <CButton onPress={handleLogout}>Logout</CButton>
        <Box mt="6" />
        <CButton onPress={navigateToPayment}>Add payment</CButton>
        <Box mt="6" />
        <CButton onPress={navigateToProfile}>Profile</CButton>
      </Box>
    </SafeScreen>
  );
}

export default Home;
