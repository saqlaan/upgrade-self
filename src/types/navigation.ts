import type { StackScreenProps } from "@react-navigation/stack";

export type ApplicationStackParamList = {
  Example: undefined;
  Login: undefined;
  Signup: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
