import { object, string } from "yup";

const forgotPassword = object({
  email: string().email().required(),
});

export default forgotPassword;
