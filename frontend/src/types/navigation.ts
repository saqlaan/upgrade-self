import type { StackScreenProps } from "@react-navigation/stack";

export type ApplicationStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Startup: undefined;
  Home: undefined;
  EmailVerification: undefined;
  TOS: undefined;
  Locations: undefined;
  LoadingScreen: undefined;
  ProfileSetup: undefined;
  Welcome: undefined;
  QuestionStep: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
