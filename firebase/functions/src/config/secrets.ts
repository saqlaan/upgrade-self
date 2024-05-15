import { defineSecret } from "firebase-functions/params";

export const BRAIN_UPGRADE_SERVICE_ACCOUNT_BASE64 = defineSecret("BRAIN_UPGRADE_SERVICE_ACCOUNT_BASE64");
export const BRAIN_UPGRADE_API_URL = defineSecret("BRAIN_UPGRADE_API_URL");
export const INBODY_API_KEY = defineSecret("INBODY_API_KEY");
export const PAYMENT_REDIRECT_URL = defineSecret("PAYMENT_REDIRECT_URL");

const secrets = [BRAIN_UPGRADE_SERVICE_ACCOUNT_BASE64, BRAIN_UPGRADE_API_URL, INBODY_API_KEY, PAYMENT_REDIRECT_URL];

export default secrets;
