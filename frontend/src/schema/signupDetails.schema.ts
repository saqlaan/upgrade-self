import { object, string } from "yup";

const signupDetailsSchema = object({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  dob: string().required("Date of birth is required"),
  gender: string().required("Gender is required"),
  address1: string().required("Primary address is required"),
  address2: string(),
  city: string().required("City is required"),
  state: string().required("State is required"),
  zipcode: string().required("ZIP code is required"),
  phone: string()
    .matches(
      /^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      "Invalid phone number"
    )
    .required("Phone number is required"),
});

export default signupDetailsSchema;
