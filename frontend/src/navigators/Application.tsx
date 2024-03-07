import {
  EmailVerification,
  Home,
  LoadingScreen,
  Locations,
  ProfileSetup,
  Startup,
  TOS,
  Welcome,
} from "@/screens";
import ForgotPassword from "@/screens/AuthScreens/ForgotPassword/ForgotPassword";
import Login from "@/screens/AuthScreens/Login/Login";
import Signup from "@/screens/AuthScreens/Signup/Signup";
import type { ApplicationStackParamList } from "@/types/navigation";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useCallback, useEffect, useState } from "react";

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  function onAuthStateChanged(user: FirebaseAuthTypes.User) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const getNavigator = useCallback(() => {
    if (user && user.emailVerified) return <PrivateNavigator />;
    else return <PublicNavigator />;
  }, [user]);

  return <NavigationContainer>{getNavigator()}</NavigationContainer>;
}

const PublicNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Startup"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Startup" component={Startup} />
      <Stack.Screen name="TOS" component={TOS} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
    </Stack.Navigator>
  );
};

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Locations"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Locations" component={Locations} />
    </Stack.Navigator>
  );
};

const PrivateNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="Locations" component={Locations} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
};
export default ApplicationNavigator;
