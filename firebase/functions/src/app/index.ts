import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { https } from "firebase-functions";
import { validateFirebaseIdToken } from "./middleware";
import { zenotiRoutes } from "./routes";
const api = express();

api.use(cors({ origin: true }));
api.use(cookieParser());
api.use("/zenoti", validateFirebaseIdToken);
api.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});
api.use("/zenoti", zenotiRoutes);

export const app = https.onRequest(api);
