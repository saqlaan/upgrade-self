import { Home, Startup } from "@/screens";
import ForgotPassword from "@/screens/ForgotPassword/ForgotPassword";
import Login from "@/screens/Login/Login";
import Signup from "@/screens/Signup/Signup";
import type { ApplicationStackParamList } from "@/types/navigation";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      {user ? <PrivateNavigator /> : <PublicNavigator />}
    </NavigationContainer>
  );
}

const PublicNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Startup"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Startup" component={Startup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

const PrivateNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
export default ApplicationNavigator;
