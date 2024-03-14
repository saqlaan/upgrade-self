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
    .required("Phone number is required")
    .min(12, "Invalid phone number")
    .max(12, "Invalid phone number"),
});

export default signupDetailsSchema;
