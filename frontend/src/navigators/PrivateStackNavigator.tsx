import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  AppointmentScreen,
  BillingInfoScreen,
  BookAppointmentDetailsScreen,
  BookAppointmentScreen,
  BookAppointmentSuccessScreen,
  ChangePasswordScreen,
  EditProfileScreen,
  Home,
  PaymentScreen,
  ProfileScreen,
  StatsScreen,
} from "@/screens";
import { ApplicationStackParamList } from "@/types/navigation";
import { BottomTabBar } from "@/components";
import { getUser } from "@/services/firebase";
import { useCenter } from "@/store/center";

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
      <Tab.Screen name="BookAppointmentTab" component={BookAppointmentScreen} />
      <Tab.Screen name="StatsScreen" component={StatsScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const PrivateStackNavigator = () => {
  const { setCenter } = useCenter();
  useEffect(() => {
    setupUser();
  }, []);

  async function setupUser() {
    const user = await getUser();
    if (user?.centers) {
      setCenter(user?.centers[0]);
    }
  }

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
        component={BookAppointmentScreen}
      />
      <ProfileStackNavigator.Screen
        name="BookAppointmentDetailsScreen"
        component={BookAppointmentDetailsScreen}
      />
      <ProfileStackNavigator.Screen
        name="BillingInfoScreen"
        component={BillingInfoScreen}
      />
      <ProfileStackNavigator.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
      <ProfileStackNavigator.Screen
        name="PaymentScreen"
        component={PaymentScreen}
      />
      <ProfileStackNavigator.Screen
        name="BookAppointmentSuccessScreen"
        component={BookAppointmentSuccessScreen}
      />
    </ProfileStackNavigator.Navigator>
  );
};

export default PrivateStackNavigator;
