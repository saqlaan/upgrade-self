import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  MyAppointmentsScreen,
  BillingInfoScreen,
  BookAppointmentDetailsScreen,
  BookAppointmentScreen,
  BookAppointmentSuccessScreen,
  ChangePasswordScreen,
  EditProfileScreen,
  FinishOnBoarding,
  Home,
  LoadingScreen,
  Locations,
  PaymentScreen,
  ProfileScreen,
  ProfileSetup,
  QuestionStep,
  StatsScreen,
  Welcome,
  MyAppointmentDetailsScreen,
} from "@/screens";
import { ApplicationStackParamList } from "@/types/navigation";
import { BottomTabBar } from "@/components";
import { getUser } from "@/services/firebase";
import { useCenterStore } from "@/store/centerStore";
import { fetchAllCentersData } from "@/services/firebaseApp/centers";

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
      <Tab.Screen
        name="MyAppointmentsScreen"
        component={MyAppointmentsScreen}
      />
      <Tab.Screen name="BookAppointmentTab" component={BookAppointmentScreen} />
      <Tab.Screen name="StatsScreen" component={StatsScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const PrivateStackNavigator = () => {
  const { setCenter, setAllCenters } = useCenterStore();
  useEffect(() => {
    setupUser();
  }, []);

  async function setupUser() {
    const user = await getUser();
    if (user?.centers) {
      setCenter(user?.centers[0]);
    }
    const centers = await fetchAllCentersData();
    setAllCenters(centers || []);
  }

  return (
    <ProfileStackNavigator.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LoadingScreen"
    >
      <ProfileStackNavigator.Screen
        name="LoadingScreen"
        component={LoadingScreen}
      />
      <ProfileStackNavigator.Screen name="MainTab" component={TabNavigator} />
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
      <ProfileStackNavigator.Screen
        name="LocationsScreen"
        component={Locations}
      />
      <ProfileStackNavigator.Screen
        name="ProfileSetupScreen"
        component={ProfileSetup}
      />
      <ProfileStackNavigator.Screen name="WelcomeScreen" component={Welcome} />
      <ProfileStackNavigator.Screen
        name="QuestionStepScreen"
        component={QuestionStep}
      />
      <ProfileStackNavigator.Screen
        name="FinishOnBoardingScreen"
        component={FinishOnBoarding}
      />
      <ProfileStackNavigator.Screen
        name="MyAppointmentDetailScreen"
        component={MyAppointmentDetailsScreen}
      />
    </ProfileStackNavigator.Navigator>
  );
};

export default PrivateStackNavigator;
