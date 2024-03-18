import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { Organization } from "../../config/zenotiConfig";
import { getAllCentersData, guestSignup } from "../../services/zenoti";
import { FirestoreUserType, GuestType } from "../../types";
import { CountryCodes } from "../../types/enums/countryCode";

const firestore = getFirestore();

export const getAllCentersAsync = async (req: Request, res: Response) => {
  try {
    const data = await getAllCentersData();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  return;
};

export const signupUserInZenoti = async (user: FirestoreUserType) => {
  try {
    if (
      !user.email ||
      !user.firstName ||
      !user.lastName ||
      !user.gender ||
      !user.dob ||
      !user.address1 ||
      !user.city ||
      !user.zipcode ||
      !user.centers
    ) {
      throw new Error("Missing required user data");
    }

    const data: GuestType = {
      center_id: "",
      personal_info: {
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        gender: user.gender,
        date_of_birth: user.dob,
        mobile_phone: {
          country_code: user.phone.code,
          number: user.phone.number,
        },
      },
      address_info: {
        address_1: user.address1,
        address_2: user.address2 || "",
        city: user.city,
        zip_code: user.zipcode,
      },
    };

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
      const result = await guestSignup(
        { ...data, center_id: center.centerId },
        center.countryCode as Organization,
      );
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
