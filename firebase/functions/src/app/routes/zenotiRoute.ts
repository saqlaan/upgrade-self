const express = require("express");
import { Request, Response } from "express";
import { getAllCentersAsync } from "../controllers/zenotiController";
const router = express.Router();

router.get("/user", (req: Request, res: Response) => {
  return res.status(200).json("hello from user route");
});

router.get("/centers", getAllCentersAsync);

export const zenotiRoutes = router;
