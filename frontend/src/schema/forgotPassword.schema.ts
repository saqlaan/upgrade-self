import { object, string } from "yup";

const forgotPassword = object({
  email: string().email().required("Email is required"),
});

export default forgotPassword;
