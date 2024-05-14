import { defineSecret } from "firebase-functions/params";

export const INBODY_API_KEY = defineSecret("INBODY_API_KEY");

const secrets = [INBODY_API_KEY];

export default secrets;
