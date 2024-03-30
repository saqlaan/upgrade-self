import "dotenv/config";
import { getFirestore } from "firebase-admin/firestore";
import { FirestoreUserType } from "../../types";
const firestore = getFirestore();

type UpdateUserType = Pick<
  FirestoreUserType,
  | "firstName"
  | "lastName"
  | "gender"
  | "dob"
  | "address1"
  | "address2"
  | "city"
  | "state"
  | "zipcode"
  | "phone"
  | "zenotiIntegration"
  | "centers"
>;

export const updateUserCollectionDoc = async (id: string, data: UpdateUserType) => {
  await firestore
    .collection("users")
    .doc(id)
    .update({ ...data });
};
