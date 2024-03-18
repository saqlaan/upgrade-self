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
