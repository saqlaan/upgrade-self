import { Example } from "@/screens";
import Login from "@/screens/Login/Login";
import Signup from "@/screens/Signup/Signup";
import { useTheme } from "@/theme";
import type { ApplicationStackParamList } from "@/types/navigation";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
  const { variant, navigationTheme } = useTheme();
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
    <NavigationContainer theme={navigationTheme}>
      {user ? <PrivateNavigator /> : <PublicNavigator />}
    </NavigationContainer>
  );
}

const PublicNavigator = () => {
  const { variant, navigationTheme } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      key={variant}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

const PrivateNavigator = () => {
  const { variant, navigationTheme } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Example"
      key={variant}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Example" component={Example} />
    </Stack.Navigator>
  );
};
export default ApplicationNavigator;
