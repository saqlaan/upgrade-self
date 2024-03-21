export * from "./firebase";
export * from "./questions";
export * from "./zenoti";

export enum Gender {
  Male = 1,
  Female = 0,
  NotSpecified = -1,
}

export interface ProfileFormValuesType {
  firstName: string;
  lastName: string;
  dob: string;
  gender: Gender;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  phoneNumberCode: string;
}
