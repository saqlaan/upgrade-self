import { object, string } from "yup";

const forgotPassword = object({
  email: string().email("Email must be valid").required("Email is required"),
});

export default forgotPassword;
