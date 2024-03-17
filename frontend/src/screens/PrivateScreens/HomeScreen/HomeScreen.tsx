import { Box, CButton } from "@/components/atoms";
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

  const navigateToPayment = () => {
    // navigation.navigate("PaymentScreen");
    navigation.navigate("PaymentScreen")
  };

  return (
    <SafeScreen>
      <Box flex={1} alignItems="center" justifyContent="center">
        <CButton onPress={handleLogout}>Logout</CButton>
        <Box mt="6" />
        <CButton onPress={navigateToPayment}>Add payment</CButton>
      </Box>
    </SafeScreen>
  );
}

export default Home;
