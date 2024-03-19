import express, { Request, Response } from "express";
import { getAllCentersAsync } from "../controllers/centerController";
import { addPaymentAsync } from "../controllers/guestController";
const router = express.Router();

router.get("/user", (req: Request, res: Response) => {
  return res.status(200).json("hello from user route");
});

router.get("/centers", getAllCentersAsync);
router.post("/payment", addPaymentAsync);

export const zenotiRoutes = router;
