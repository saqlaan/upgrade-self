import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  AppointmentScreen,
  BillingInfoScreen,
  EditProfileScreen,
  Home,
  ProfileScreen,
  StatsScreen,
} from "@/screens";
import { ApplicationStackParamList } from "@/types/navigation";
import { BottomTabBar } from "@/components";
import ChangePasswordScreen from "@/screens/PrivateScreens/ChangePasswordScreen/ChangePasswordScreen";
import BookAppointment from "@/screens/PrivateScreens/BookAppointmentScreen/BookAppointmentScreen";

const ProfileStackNavigator = createStackNavigator<ApplicationStackParamList>();

const Tab = createBottomTabNavigator<ApplicationStackParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="StartupScreen"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="HomeScreen" component={Home} />
      <Tab.Screen name="AppointmentScreen" component={AppointmentScreen} />
      <Tab.Screen name="BookAppointmentTab" component={BookAppointment} />
      <Tab.Screen name="StatsScreen" component={StatsScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const PrivateStackNavigator = () => {
  return (
    <ProfileStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStackNavigator.Screen
        name="ProfileScreen"
        component={TabNavigator}
      />
      <ProfileStackNavigator.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
      <ProfileStackNavigator.Screen
        name="BookAppointmentScreen"
        component={BookAppointment}
      />
      <ProfileStackNavigator.Screen
        name="BillingInfoScreen"
        component={BillingInfoScreen}
      />
      <ProfileStackNavigator.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
    </ProfileStackNavigator.Navigator>
  );
};

export default PrivateStackNavigator;
