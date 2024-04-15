import express, { Request, Response } from "express";
import { getAllCentersAsync } from "../controllers/centerController";
import { addPaymentAsync } from "../controllers/guestController";
import { createServiceBooking, getCenterServices } from "../controllers/servicesController";
const router = express.Router();

router.get("/user", (req: Request, res: Response) => {
  return res.status(200).json("hello from user route");
});

router.get("/centers", getAllCentersAsync);
router.post("/payment", addPaymentAsync);
router.get("/getServices", getCenterServices);
router.get("/createServiceBooking", createServiceBooking);

export const zenotiRoutes = router;
