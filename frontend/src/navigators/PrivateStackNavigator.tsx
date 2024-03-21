import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  EditProfileScreen,
  Home,
  PaymentScreen,
  ProfileScreen,
} from "@/screens";

import { ApplicationStackParamList } from "@/types/navigation";

const Stack = createStackNavigator<ApplicationStackParamList>();

const PrivateStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="StartupScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default PrivateStackNavigator;
