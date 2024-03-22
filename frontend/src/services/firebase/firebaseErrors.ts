interface FirebaseAuthErrorMessages {
  [errorCode: string]: string;
}
export default {
  "auth/user-not-found":
    "User not found. Please check your email and try again.",
  "auth/wrong-password": "Invalid password. Please try again.",
  "auth/invalid-email": "Invalid email address. Please enter a valid email.",
  "auth/email-already-in-use":
    "Email address is already in use. Please use a different email or try signing in.",
  "auth/weak-password": "Password is too weak. Please use a stronger password.",
  "auth/network-request-failed":
    "Network error. Please check your internet connection and try again.",
  "auth/too-many-requests":
    "Too many unsuccessful login attempts. Please try again later.",
  "auth/requires-recent-login": "Please log in again to proceed.",
  "auth/user-disabled":
    "Your account has been disabled. Please contact support for assistance.",
  "auth/operation-not-allowed":
    "This operation is not allowed. Please contact support for assistance.",
  "auth/account-exists-with-different-credential":
    "An account already exists with the same email address but different sign-in credentials. Please sign in using a different method.",
  "auth/popup-closed-by-user":
    "Sign in popup was closed unexpectedly. Please try again.",
  "auth/unauthorized-domain":
    "Unauthorized domain. Please contact support for assistance.",
  "auth/user-mismatch":
    "The supplied credentials do not correspond to the previously signed in user.",
  "auth/invalid-credential":
    "Incorrect cridentials. Please verify your cridentials and try again.",
} as FirebaseAuthErrorMessages;
