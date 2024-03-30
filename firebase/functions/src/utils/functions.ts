import { FirestoreUserType, GuestType } from "../types"

type MapZenotiUserDataToFirestore = Pick<FirestoreUserType, "firstName" | "lastName" | "gender" | "dob" | "address1" | "address2" | "city" | "state" | "zipcode" | "phone">

export const mapZenotiUserDataToFirestore = (zenotiUser: GuestType): MapZenotiUserDataToFirestore => {
    const { address_info, personal_info } = zenotiUser
    return {
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
    }
}