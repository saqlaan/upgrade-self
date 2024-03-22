import { object, ref, string } from "yup";

const changePasswordSchema = object({
  currentPassword: string().required("Password is required"),
  newPassword: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: string()
    .oneOf([ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default changePasswordSchema;
