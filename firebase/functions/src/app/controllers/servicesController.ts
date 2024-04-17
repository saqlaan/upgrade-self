import { Request, Response } from "express";
import { Organization } from "../../config/zenotiConfig";
import * as serviceBooking from "../../services/zenoti/serviceBooking";

interface GetCentersQueryParams {
  centerId: string;
  countryCode: Organization;
  size?: number;
  page: number;
}

export const getCenterServices = async (
  req: Request<unknown, unknown, unknown, GetCentersQueryParams>,
  res: Response,
) => {
  try {
    const { centerId, countryCode, size, page } = req.query;
    if (!centerId || !countryCode) {
      res.status(403).json({ message: "Center id or country code is missing" });
    }
    const data = await serviceBooking.getCenterServices({
      centerId,
      organization: countryCode,
      size,
      page,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error getting the services", error);
    res.status(403).json({ message: "Error getting the services" });
  }
  return;
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { guestId, centerId, serviceId, date, countryCode } = req.body;
    if (!centerId || !serviceId || !guestId || !date) {
      res.status(403).json({ message: "Center id or country code or serviceId or date is missing" });
    }
    const data = await serviceBooking.createAppointment({
      centerId,
      organization: countryCode,
      date,
      guestId,
      serviceId,
    });
    return res.json(data);
  } catch (error) {
    console.error("Error getting the services", error);
    res.status(403).json({ message: "Error getting the services" });
  }
  return;
};

export const getSlots = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.bookingId;
    const { countryCode } = req.body;
    const data = await serviceBooking.getSlots({
      bookingId,
      organization: countryCode,
    });
    return res.json(data);
  } catch (error) {
    console.error("Error getting the services", error);
    res.status(403).json({ message: "Error getting the services" });
    return null;
  }
};

export const reserveSlot = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.bookingId;
    const { countryCode, slotTime } = req.body;
    const data = await serviceBooking.reserveSlot({
      bookingId,
      organization: countryCode,
      time: slotTime,
    });
    return res.json(data);
  } catch (error) {
    console.error("Error reserving the slot", error);
    res.status(403).json({ message: "Error reserving the slot" });
    return null;
  }
};

export const confirmBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.bookingId;
    const { countryCode } = req.body;
    const data = await serviceBooking.confirmBooking({
      bookingId,
      organization: countryCode,
    });
    return res.json(data);
  } catch (error) {
    console.error("Error confirming the slot", error);
    res.status(403).json({ message: "Error confirming the slot" });
    return null;
  }
};
