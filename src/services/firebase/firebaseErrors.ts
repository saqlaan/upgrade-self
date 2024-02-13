interface FirebaseAuthErrorMessages {
  [errorCode: string]: string;
}
export default {
  "auth/email-already-in-use":
    "The email address is already in use by another account.",
  "auth/invalid-email": "The email address is not valid.",
  "auth/user-not-found": "There is no user corresponding to the given email.",
  "auth/wrong-password": "The password is invalid.",
  "auth/weak-password": "The password must be at least 6 characters long.",
  "auth/network-request-failed":
    "A network error occurred. Please check your internet connection.",
  "auth/user-disabled":
    "The user account has been disabled by an administrator.",
  "auth/too-many-requests":
    "Too many unsuccessful login attempts. Please try again later.",
  "auth/operation-not-allowed":
    "Email/password accounts are not enabled. Please contact support.",
  "auth/user-mismatch":
    "The supplied credentials do not correspond to the previously signed in user.",
  "auth/requires-recent-login":
    "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
} as FirebaseAuthErrorMessages;
