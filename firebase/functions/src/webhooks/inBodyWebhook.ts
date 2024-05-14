import * as functions from "firebase-functions";
import secrets, { INBODY_API_KEY } from "../config/secrets";
import axios from "../config/inbodyAxiosConfig";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

import moment from "moment";

const firestore = getFirestore();

export const inBodyWebhook = functions.runWith({ secrets: secrets }).https.onRequest(async (req, res) => {
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
    .then(async (response) => {
      const userRef = firestore.collection("users").where("inBodyIntegration.userToken", "==", usertoken);

      const user = await userRef.get().then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        return querySnapshot.docs[0].data();
      });

      if (!user) {
        console.error("No user found with usertoken:", usertoken);
        res.send("No user found with usertoken");
        return;
      }

      const inBodyData = firestore.collection("inBodyData").doc();

      const timestamp = Timestamp.fromDate(moment(response.data.DATETIMES, "YYYYMMDDHHmmss").toDate());

      inBodyData.set({
        userId: user.uid,
        timestamp: timestamp,
        data: response.data,
      });

      res.send(response.data);
    })
    .catch((error) => {
      console.error("Error calling function:", error);
      res.send(error);
    });
});
