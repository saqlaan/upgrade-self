import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { Organization } from "../../config/zenotiConfig";
import { addGuestPayment, fetchGuestPaymentMethods, guestSignup } from "../../services/zenoti";
import * as guestService from "../../services/zenoti/guests";
import { FirestoreUserType, GuestType } from "../../types";
import { CountryCodes } from "../../types/enums/countryCode";
import { mapFirebaseUserToZenotiGuest } from "../../utils";

const firestore = getFirestore();

export const signupUserInZenotiAsync = async (user: FirestoreUserType) => {
  try {
    const data = mapFirebaseUserToZenotiGuest(user);
    let centers: { centerId: string; countryCode: string }[] = [];
    if (user.centers[0].countryCode === CountryCodes.US) {
      centers = [
        user.centers[0],
        {
          centerId: process.env.CA_CENTER_ID || "",
          countryCode: CountryCodes.CA,
        },
      ];
      centers.push();
    } else {
      centers = [
        user.centers[0],
        {
          centerId: process.env.US_CENTER_ID || "",
          countryCode: CountryCodes.US,
        },
      ];
    }

    if (!centers) {
      throw new Error("Failed to retrieve center data");
    }

    // Make signup request for each center
    const promises = centers.map(async (center) => {
      const result = await guestSignup({ ...data, center_id: center.centerId }, center.countryCode as CountryCodes);
      const { center_id: centerId, id } = result?.data as GuestType;
      return {
        centerId: centerId,
        countryCode: center.countryCode,
        guestId: id,
      };
    });

    console.log("Signup user in the Zenoti");
    const centersSignupData = await Promise.all(promises);

    const document = {
      userId: user.uid,
      guestAccounts: centersSignupData,
    };

    await firestore.collection("zenotiGuests").doc().set(document);
  } catch (error) {
    console.error("Error during user signup in zenoti:", error);
    throw error;
  }
};

export const addPaymentAsync = async (req: Request, res: Response) => {
  try {
    const { guestId, centerId, countryCode } = req.body;
    if (!guestId || !centerId) {
      res.status(403).json({ message: "Guest id or center id is missing" });
    }

    const data = await addGuestPayment({
      centerId,
      countryCode,
      guestId,
    });
    res.json(data.data);
  } catch (error) {
    console.error("Error adding payment", error);
    res.status(403).json({ message: "Error adding payment" });
  }
  return;
};

export const getGuestPaymentMethods = async (req: Request, res: Response) => {
  try {
    const { guestId } = req.params;
    const { centerId, countryCode } = req.query;
    if (!guestId || !centerId || !countryCode) {
      res.status(403).json({ message: "Guest id or center id is missing" });
    }
    const data = await fetchGuestPaymentMethods({
      centerId: centerId as string,
      countryCode: countryCode as Organization,
      guestId,
    });
    res.json(data);
  } catch (error) {
    console.error("Error adding payment", error);
    res.status(403).json({ message: "Error adding payment" });
  }
};

export const getGuestBookings = async (req: Request, res: Response) => {
  try {
    const { guestId } = req.params;
    const { countryCode, size, page } = req.query;
    if (!guestId || !countryCode) {
      res.status(403).json({ message: "GuestId or country code is missing" });
    }
    const data = await guestService.getGuestBookings({
      guestId,
      organization: countryCode as Organization,
      size: size as unknown as number,
      page: page as unknown as number,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error getting the services", error);
    res.status(403).json({ message: "Error getting the services" });
  }
  return;
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { invoiceId } = req.params;
    const { countryCode } = req.query;
    if (!invoiceId || !countryCode) {
      res.status(403).json({ message: "InvoiceId or country code is missing" });
    }
    const data = await guestService.cancelBooking({
      invoiceId: invoiceId as string,
      organization: countryCode as Organization,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Error canceling the booking", error });
  }
  return;
};
