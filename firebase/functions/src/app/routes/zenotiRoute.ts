import express, { Request, Response } from "express";
import { getAllCentersAsync } from "../controllers/centerController";
import {
  addPaymentAsync,
  cancelBooking,
  getGuestBookings,
  getGuestPaymentMethods,
} from "../controllers/guestController";
import {
  confirmBooking,
  createAppointment,
  getCenterServices,
  getSlots,
  reserveSlot,
} from "../controllers/servicesController";
const router = express.Router();

router.get("/user", (req: Request, res: Response) => {
  return res.status(200).json("hello from user route");
});

router.get("/centers", getAllCentersAsync);
router.post("/payment", addPaymentAsync);
router.get("/getServices", getCenterServices);
router.post("/bookings", createAppointment);
router.get("/bookings/:bookingId/slots", getSlots);
router.post("/bookings/:bookingId/slots/reserve", reserveSlot);
router.post("/bookings/:bookingId/slots/confirm", confirmBooking);
router.get("/guests/:guestId/accounts", getGuestPaymentMethods);
router.get("/guests/:guestId/appointments", getGuestBookings);
router.put("/invoices/:invoiceId/cancel", cancelBooking);

export const zenotiRoutes = router;
