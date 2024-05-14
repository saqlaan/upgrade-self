import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { validateFirebaseIdToken } from "./middleware";
import { zenotiRoutes, brainUpgradeRoutes } from "./routes";
import secrets from "./secrets";
import * as functions from "firebase-functions";
const api = express();

api.use(cors({ origin: true }));
api.use(cookieParser());
api.use("/zenoti", validateFirebaseIdToken);
api.use("/brain-upgrade", validateFirebaseIdToken);
api.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});
api.use("/zenoti", zenotiRoutes);
api.use("/brain-upgrade", brainUpgradeRoutes);

export const app = functions.runWith({ secrets: secrets }).https.onRequest(api);
