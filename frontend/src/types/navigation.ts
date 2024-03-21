import type { StackScreenProps } from "@react-navigation/stack";

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
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
