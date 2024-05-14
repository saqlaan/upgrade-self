import { UserInfo } from "firebase-admin/auth";
import { Timestamp } from "@firebase/firestore-types";

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
  gender: number;
  firstName: string;
  lastName: string;
  onBoardingStep: number;
  onboardingCompleted: boolean;
  emailVerified: boolean;
  phone: {
    number: string;
    code: number;
  };
  questions: UserQuestionType[];
  state: string | number;
  zipcode: number;
  dob: string;
  address1: string;
  address2: string;
  city: string;
  zenotiIntegration: {
    signedUp: boolean;
  };
  inBodyIntegration: {
    userToken: string;
  };
  centers: {
    centerId: string;
    countryCode: "US" | "CA";
    name: string;
  }[];
  existingZenotiUser: boolean;
};

export type FirestoreZenotiGuestType = {
  userId: string;
  guestAccounts: {
    centerId: string;
    countryCode: string;
    guestId: string;
  }[];
};

export type FirestoreInBodyDataType = {
  userId: string;
  timestamp: Timestamp;
  data: {
    NAME: string;
    USER_ID: string;
    HT: string;
    BIRTHDAY: string;
    GENDER: string;
    AGE: string;
    TEL_HP: string;
    E_MAIL: string;
    USER_REG_DATE: string;
    MEMO: string;
    DATETIMES: string;
    WT: string;
    WT_MIN: string;
    WT_MAX: string;
    TBW: string;
    TBW_MIN: string;
    TBW_MAX: string;
    DM: string;
    BFM: string;
    PBFM_MIN: string;
    PBFM_MAX: string;
    FFM: string;
    SMM: string;
    SMM_MIN: string;
    SMM_MAX: string;
    BMI: string;
    BMI_MIN: string;
    BMI_MAX: string;
    PBF: string;
    PBF_MIN: string;
    PBF_MAX: string;
    LRA: string;
    PILRA: string;
    LLA: string;
    PILLA: string;
    LT: string;
    PILT: string;
    LRL: string;
    PILRL: string;
    LLL: string;
    PILLL: string;
    FC: string;
    BMR: string;
    EQUIP: string;
    FS: string;
    EQUIP_SERIAL: string;
  };
};
