import express, { Request, Response } from "express";
import { BRAIN_UPGRADE_SERVICE_ACCOUNT_BASE64 } from "../../config/secrets";
import * as admin from "firebase-admin";
import axios from "axios";

const router = express.Router();

const BRAIN_UPGRADE_API_URL = "https://api-by67lu2b2q-uc.a.run.app";

let brainUpgradeApp: admin.app.App | null = null;
const getBrainUpgradeApp = () => {
  if (!brainUpgradeApp) {
    const serviceAccount = JSON.parse(
      Buffer.from(BRAIN_UPGRADE_SERVICE_ACCOUNT_BASE64.value(), "base64").toString("ascii"),
    );

    brainUpgradeApp = admin.initializeApp(
      {
        credential: admin.credential.cert(serviceAccount),
      },
      "brain-upgrade-app",
    );
  }
  return brainUpgradeApp;
};

const getBrainUpgradeAuthToken = async () => {
  const brainUpgradeApp = getBrainUpgradeApp();

  try {
    const token = await brainUpgradeApp.auth().createCustomToken("brain-upgrade-user");
    return token;
  } catch (error) {
    console.error("Error calling function:", error);
    return null;
  }
};

const getBrainUpgradeUserFromEmail = async (token: string, email: string) => {
  try {
    const response = await axios({
      method: "get", // or 'post', 'put', etc.
      url: `${BRAIN_UPGRADE_API_URL}/users?email=${encodeURIComponent(email)}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error calling function:", error);
    return null;
  }
};

const getBrainUpgradeReports = async (token: string, userId: string, limit: number | null = null) => {
  try {
    const url = `${BRAIN_UPGRADE_API_URL}/user/${userId}/reports` + (limit ? `?limit=${limit}` : "");
    const response = await axios({
      method: "get", // or 'post', 'put', etc.
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error calling function:", error);
    return null;
  }
};

const getBrainUpgradeUserAsync = async (req: Request, res: Response) => {
  const token = await getBrainUpgradeAuthToken();
  if (!token) {
    res.status(500).send("Error getting token");
    return;
  }
  const firebaseUser = (req as unknown as { user: admin.auth.DecodedIdToken }).user;
  const email = firebaseUser.email;
  if (!email) {
    res.status(500).send("Error getting email");
    return;
  }
  const user = await getBrainUpgradeUserFromEmail(token, email);
  if (!user) {
    res.status(500).send("Error getting user");
    return;
  }
  res.status(200).send(user);
};

const getBrainUpgradeReportsAsync = async (req: Request, res: Response) => {
  const token = await getBrainUpgradeAuthToken();
  if (!token) {
    res.status(500).send("Error getting token");
    return;
  }
  const firebaseUser = (req as unknown as { user: admin.auth.DecodedIdToken }).user;
  const email = firebaseUser.email;
  if (!email) {
    res.status(500).send("Error getting email");
    return;
  }
  const user = await getBrainUpgradeUserFromEmail(token, email);
  if (!user) {
    res.status(500).send("Error getting user");
    return;
  }
  const limit = req.query.limit ? parseInt(req.query.limit as string) : null;
  const reports = await getBrainUpgradeReports(token, user.userId, limit);
  if (!reports) {
    res.status(500).send("Error getting reports");
    return;
  }
  res.status(200).send(reports);
};

router.get("/user", getBrainUpgradeUserAsync);
router.get("/reports", getBrainUpgradeReportsAsync);

export const brainUpgradeRoutes = router;
