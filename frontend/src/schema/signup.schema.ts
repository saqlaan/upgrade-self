import { object, ref, string } from "yup";

const signupSchema = object({
  email: string().email("Email must valid").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  // ),
});

export default signupSchema;
