import { UserInfo } from "firebase-admin/auth";

export type UserQuestionType = {
  question: {
    id: number;
    name: string;
  };
  value: {
    id: number;
    value: string;
  };
};

export type FirestoreUserType = UserInfo & {
  gender: string;
  firstName: string;
  lastName: string;
  onBoardingStep: number;
  onboardingCompleted: boolean;
  phone: string;
  questions: UserQuestionType[];
  state: string;
  zipcode: string;
  dob: string;
  address1: string;
  address2: string;
  city: string;
};
