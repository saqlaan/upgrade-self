import type { StackScreenProps } from "@react-navigation/stack";

import { GuestAppointmentType } from "./zenoti/BookedAppointmentType";
export type ApplicationStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  ForgotPasswordScreen: undefined;
  StartupScreen: undefined;
  HomeScreen: undefined;
  EmailVerificationScreen: undefined;
  TOSScreen: undefined;
  LocationsScreen: undefined;
  LoadingScreen: undefined;
  ProfileSetupScreen: undefined;
  WelcomeScreen: undefined;
  QuestionStepScreen: undefined;
  FinishOnBoardingScreen: undefined;
  PaymentScreen: undefined;
  ProfileScreen: undefined;
  EditProfileScreen: undefined;
  AppointmentScreen: undefined;
  StatsScreen: undefined;
  ProfileTab: undefined;
  BillingInfoScreen: undefined;
  ChangePasswordScreen: undefined;
  BookAppointmentScreen: undefined;
  BookAppointmentTab: undefined;
  BookAppointmentDetailsScreen: undefined;
  BookAppointmentSuccessScreen: undefined;
  MainTab: undefined;
  MyAppointmentDetailScreen: {
    appointment: GuestAppointmentType;
  };
  MyAppointmentsScreen: undefined;
  RescheduleAppointmentScreen: {
    appointment: GuestAppointmentType;
  };
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
