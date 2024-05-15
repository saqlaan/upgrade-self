import { defineSecret } from "firebase-functions/params";

export const BRAIN_UPGRADE_SERVICE_ACCOUNT_BASE64 = defineSecret("BRAIN_UPGRADE_SERVICE_ACCOUNT_BASE64");
export const INBODY_API_KEY = defineSecret("INBODY_API_KEY");
export const PAYMENT_REDIRECT_URL = defineSecret("PAYMENT_REDIRECT_URL");

const secrets = [BRAIN_UPGRADE_SERVICE_ACCOUNT_BASE64, INBODY_API_KEY, PAYMENT_REDIRECT_URL];

export default secrets;
