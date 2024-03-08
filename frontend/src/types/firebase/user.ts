export interface UserType {
  uid?: string;
  email?: string;
  emailVerified?: boolean;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  phoneNumber?: string;
  disabled?: boolean;
  onboardingCompleted?: boolean;
  centers?: string[];
  onBoardingStep: number;
}
