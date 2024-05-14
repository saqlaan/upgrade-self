import express, { Request, Response } from "express";
import { INBODY_API_KEY } from "../secrets";
import axios from "../../config/inbodyAxiosConfig";
// import * as admin from "firebase-admin";

const router = express.Router();

export const createInBodyUser = async (req: Request, res: Response) => {
  const inbodyApiKey = INBODY_API_KEY.value();
  const usertoken = req.body.usertoken;

  axios
    .post(
      "/user/insertuser",
      {
        iD: usertoken,
        phone: usertoken,
      },
      { headers: { "API-KEY": inbodyApiKey } },
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error calling function:", error);
      return {};
    });
};

router.post("/user/create", createInBodyUser);

export const inbodyRoutes = router;
