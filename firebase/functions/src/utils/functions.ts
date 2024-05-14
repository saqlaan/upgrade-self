import { FirestoreUserType, GuestType } from "../types";

type MapZenotiUserDataToFirestore = Pick<
  FirestoreUserType,
  | "firstName"
  | "lastName"
  | "gender"
  | "dob"
  | "address1"
  | "address2"
  | "city"
  | "state"
  | "zipcode"
  | "phone"
  | "email"
>;

export const mapZenotiUserDataToFirestore = (zenotiUser: GuestType): MapZenotiUserDataToFirestore => {
  const { address_info, personal_info } = zenotiUser;
  return {
    email: personal_info?.email,
    firstName: personal_info?.first_name,
    lastName: personal_info?.last_name,
    gender: personal_info?.gender,
    dob: personal_info?.date_of_birth,
    address1: address_info?.address_1 || "",
    address2: address_info?.address_2 || "",
    city: address_info?.city || "",
    state: address_info?.state_id || "",
    zipcode: address_info?.zip_code || -1,
    phone: {
      number: personal_info.mobile_phone?.number || "",
      code: personal_info.mobile_phone?.country_code || -1,
    },
  };
};

export const mapFirebaseUserToZenotiGuest = (user: FirestoreUserType): Omit<GuestType, "center_id" | "center_name"> => {
  // Todo: after things are good from zenoti end for address information we will update this
  if (!user.email || !user.firstName || !user.lastName || !user.dob || !user.centers) {
    throw new Error("Missing required user data");
  }

  const data = {
    personal_info: {
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      gender: user.gender,
      date_of_birth: user.dob,
      mobile_phone: {
        country_code: user.phone.code,
        number: user.phone.number,
      },
    },
    address_info: {
      address_1: user.address1 || "",
      address_2: user.address2 || "",
      city: user.city || "",
      zip_code: user.zipcode || -1,
    },
  };
  return data;
};
