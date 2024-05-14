import { defineSecret } from "firebase-functions/params";

export const BRAIN_UPGRADE_SERVICE_ACCOUNT_BASE64 = defineSecret("BRAIN_UPGRADE_SERVICE_ACCOUNT_BASE64");
export const INBODY_API_KEY = defineSecret("INBODY_API_KEY");

const secrets = [BRAIN_UPGRADE_SERVICE_ACCOUNT_BASE64, INBODY_API_KEY];

export default secrets;
