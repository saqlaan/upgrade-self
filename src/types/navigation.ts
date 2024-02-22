import type { StackScreenProps } from "@react-navigation/stack";

export type ApplicationStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Startup: undefined;
  Home: undefined;
  EmailVerification: {
    email: string;
  };
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
