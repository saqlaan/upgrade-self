import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PrivateStackNavigator from "./PrivateStackNavigator";
import OnBoardingStackNavigator from "./OnBoardingStackNavigator";
import { LoadingScreen } from "@/screens";
import { ApplicationStackParamList } from "@/types/navigation";
import { getUser } from "@/services/firebase";
import { FirestoreUser } from "@/types";

const Stack = createStackNavigator<ApplicationStackParamList>();

// Resolve the user access to the onboarding or private navigtor
const PrivateStackResolver = () => {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<FirestoreUser | null>(null);

  const verifyUser = async () => {
    const user = await getUser();
    setUser(user);
    setIsReady(true);
  };

  useEffect(() => {
    verifyUser();
  }, []);

  if (!isReady) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      </Stack.Navigator>
    );
  }
  if (user?.onboardingCompleted) {
    return <PrivateStackNavigator />;
  } else {
    return <OnBoardingStackNavigator />;
  }
};

export default PrivateStackResolver;
