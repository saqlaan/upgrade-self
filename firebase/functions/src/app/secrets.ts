import { defineSecret } from "firebase-functions/params";

export const BRAIN_UPGRADE_SERVICE_ACCOUNT_BASE64 = defineSecret("BRAIN_UPGRADE_SERVICE_ACCOUNT_BASE64");

const secrets = [BRAIN_UPGRADE_SERVICE_ACCOUNT_BASE64];

export default secrets;
