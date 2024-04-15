import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import OnBoardingStackNavigator from "./OnBoardingStackNavigator";
import PrivateStackNavigator from "./PrivateStackNavigator";
import PublicStackNavigator from "./PublicStackNavigator";
import { useUserStore } from "@/store/user.store";
import { useFirebaseSnapshots } from "@/hooks/useFirebaseSnapshots";
import { useAuthState } from "@/hooks/useAuthState";

function ApplicationNavigator() {
  const { user: authUser } = useAuthState();
  const {} = useFirebaseSnapshots();
  const { user } = useUserStore();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAppReady(true);
    }, 500);
  }, []);

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hide();
    }
  }, [isAppReady]);

  const getNavigator = useCallback(() => {
    if (!authUser || !authUser.emailVerified) {
      return <PublicStackNavigator />;
    } else if (user && user?.onboardingCompleted) {
      return <PrivateStackNavigator />;
    } else if (user && !user?.onboardingCompleted) {
      return <OnBoardingStackNavigator />;
    }
  }, [authUser, user]);

  if (isAppReady)
    return <NavigationContainer>{getNavigator()}</NavigationContainer>;
  return null;
}
export default ApplicationNavigator;
