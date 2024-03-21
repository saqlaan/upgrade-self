import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import OnBoardingStackNavigator from "./OnBoardingStackNavigator";
import PrivateStackNavigator from "./PrivateStackNavigator";
import PublicStackNavigator from "./PublicStackNavigator";
import { UseUserStore } from "@/store/user.store";
import { useFirebaseSnapshots } from "@/hooks/useFirebaseSnapshots";
import { useAuthState } from "@/hooks/useAuthState";

function ApplicationNavigator() {
  const { user: authUser } = useAuthState();
  const {} = useFirebaseSnapshots();
  const { user } = UseUserStore();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const getNavigator = useCallback(() => {
    if (!authUser || !authUser.emailVerified) {
      return <PublicStackNavigator />;
    } else if (user && user?.onboardingCompleted) {
      return <PrivateStackNavigator />;
    } else if (user && !user?.onboardingCompleted) {
      return <OnBoardingStackNavigator />;
    }
  }, [authUser, user]);

  return <NavigationContainer>{getNavigator()}</NavigationContainer>;
}
export default ApplicationNavigator;
