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
    console.log(data.data);
    res.json(data.data);
  } catch (error) {
    console.error("Error getting the services", error);
    res.status(403).json({ message: "Error getting the services" });
  }
  return;
};

export const createServiceBooking = async (
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
    console.log(data.data);
    res.json(data.data);
  } catch (error) {
    console.error("Error getting the services", error);
    res.status(403).json({ message: "Error getting the services" });
  }
  return;
};
