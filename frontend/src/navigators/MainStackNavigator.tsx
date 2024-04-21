import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import PublicStackNavigator from "./PublicStackNavigator";
import PrivateStackNavigator from "./PrivateStackNavigator";
import { useFirebaseSnapshots } from "@/hooks/useFirebaseSnapshots";
import { useAuthState } from "@/hooks/useAuthState";

function ApplicationNavigator() {
  const { user, isLoading } = useAuthState();
  useFirebaseSnapshots();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  if (user && user.emailVerified) {
    return (
      <NavigationContainer>
        <PrivateStackNavigator />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <PublicStackNavigator />
      </NavigationContainer>
    );
  }
}
export default ApplicationNavigator;
