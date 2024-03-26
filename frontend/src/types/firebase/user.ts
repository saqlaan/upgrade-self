import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export interface UserType {
  uid?: string;
  email?: string;
  emailVerified?: boolean;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  disabled?: boolean;
  onboardingCompleted?: boolean;
  centers?: {
    centerId: string;
    countryCode: "US" | "CA";
  }[];
  onBoardingStep: number;
  phone?: {
    number: string;
    code: string;
  };
}

export type FirestoreUser = FirebaseAuthTypes.UserInfo & {
  emailVerified: boolean;
  gender: number;
  firstName: string;
  lastName: string;
  onBoardingStep: number;
  onboardingCompleted: boolean;
  phone: {
    number: string;
    code: number;
  };
  questions: object[];
  state: string;
  zipcode: string;
  dob: string;
  address1: string;
  address2: string;
  city: string;
  zenotiIntegration: {
    signedUp: boolean;
  };
  centers: {
    centerId: string;
    countryCode: "US" | "CA";
  }[];
};
