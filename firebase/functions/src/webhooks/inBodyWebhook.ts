import * as functions from "firebase-functions";
import secrets, { INBODY_API_KEY } from "./secrets";
import axios from "../config/inbodyAxiosConfig";

export const inBodyWebhook = functions.runWith({ secrets: secrets }).https.onRequest((req, res) => {
  const inbody_api_key = INBODY_API_KEY.value();
  const usertoken = req.body.TelHP;
  const datetimes = req.body.TestDatetimes;

  axios
    .post(
      "/inbody/getinbodydata",
      {
        usertoken,
        datetimes,
      },
      { headers: { "API-KEY": inbody_api_key } },
    )
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
      // SAVE DATA TO FIRESTORE
    })
    .catch((error) => {
      console.error("Error calling function:", error);
      res.send(error);
    });
});
