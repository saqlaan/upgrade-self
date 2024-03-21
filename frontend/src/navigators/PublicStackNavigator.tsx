import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { EmailVerification, Startup, TOS } from "@/screens";
import ForgotPassword from "@/screens/AuthScreens/ForgotPasswordScreen/ForgotPasswordScreen";
import Login from "@/screens/AuthScreens/LoginScreen/LoginScreen";
import Signup from "@/screens/AuthScreens/SignupScreen/SignupScreen";
import { ApplicationStackParamList } from "@/types/navigation";

const Stack = createStackNavigator<ApplicationStackParamList>();

const PublicStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="StartupScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="StartupScreen" component={Startup} options={{}} />
      <Stack.Screen name="TOSScreen" component={TOS} />
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="SignupScreen" component={Signup} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} />
      <Stack.Screen
        name="EmailVerificationScreen"
        component={EmailVerification}
      />
    </Stack.Navigator>
  );
};

export default PublicStackNavigator;
