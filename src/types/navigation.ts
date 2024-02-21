import type { StackScreenProps } from "@react-navigation/stack";

export type ApplicationStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Startup: undefined;
  Home: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
