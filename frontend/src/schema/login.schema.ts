import { object, string } from "yup";

const forgotPassword = object({
  email: string().email().required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  // ),
});

export default forgotPassword;
