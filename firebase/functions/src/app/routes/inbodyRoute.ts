import express, { Request, Response } from "express";
import { createInbodyUser } from "../../services/inbody/users";
import * as admin from "firebase-admin";

const router = express.Router();

export const createInBodyUserAsync = async (req: Request, res: Response) => {
  const firebaseUser = (req as unknown as { user: admin.auth.DecodedIdToken }).user;
  const gender = firebaseUser.gender == "male" ? "M" : "F";
  const userToken = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  const birthDay = new Date(firebaseUser.dob).toISOString().split("T")[0];
  const age = new Date().getFullYear() - new Date(firebaseUser.dob).getFullYear();
  const height = firebaseUser.heightCM | 0;

  const newInBodyUser = {
    name: `${firebaseUser.firstName} ${firebaseUser.lastName}`,
    iD: userToken,
    phone: userToken,
    gender: gender as "M" | "F",
    age: age.toString(),
    height: height.toString(),
    birthDay: birthDay,
  };
  createInbodyUser(newInBodyUser).then((response) => {
    const userRef = admin.firestore().collection("users").doc(firebaseUser.uid);
    userRef.set({ inBodyIntegration: { userToken: userToken } }, { merge: true });

    res.send(response);
  });
};

router.post("/user/create", createInBodyUserAsync);

export const inbodyRoutes = router;
