// import { getFirestore } from "firebase-admin/firestore";
import { https } from "firebase-functions";

export const inBodyWebhook = https.onRequest((request, response) => {
  console.log(request.body);
});
