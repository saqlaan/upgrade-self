import "dotenv/config";
import * as functions from "firebase-functions";
import { UserType } from "../types";

export const onUserDocumentChange = functions.firestore
  .document("users/{id}")
  .onUpdate(async (change, context) => {
    const before = change.before.data() as UserType;
    const after = change.after.data() as UserType;
    if (!before.onboardingCompleted && after.onboardingCompleted) {
      // const result = await getAllCentersData();
      // console.log({ result: JSON.stringify(result) });
      // const result = await guestSignup(
      //   {
      //     center_id: "e5454ca3-d9d3-44f6-989d-769ac327c7dd",
      //     personal_info: {
      //       email: "testuser@nothing1.com",
      //       first_name: "abcd",
      //       last_name: "efgh",
      //       mobile_phone: {
      //         country_code: 95,
      //         number: "7707788888",
      //       },
      //     },
      //   },
      //   Organization.US
      // );
      // console.log({ zenotiUser: JSON.stringify(result?.data) });
      console.log(`WoW onboarding is done!!! for ${context.auth?.uid}`);
    }
  });
