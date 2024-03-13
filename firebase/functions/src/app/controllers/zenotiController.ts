import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { Organization } from "../../config/zenotiConfig";
import { getAllCentersData, guestSignup } from "../../services/zenoti";
import { FirestoreUserType, GuestType } from "../../types";

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

const mapGender = (gender: string): number => {
  const lowerCaseGender = gender.toLowerCase();
  switch (lowerCaseGender) {
    case "male":
      return 1;
    case "female":
      return 0;
    case "other":
      return 3;
    default:
      throw new Error("Invalid gender specified");
  }
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
      !user.zipcode
    ) {
      throw new Error("Missing required user data");
    }
    // Get all the centers
    const centers = await getAllCentersData();
    if (!centers) {
      throw new Error("Failed to retrieve center data");
    }

    const data: GuestType = {
      center_id: "",
      personal_info: {
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        gender: mapGender(user.gender),
        date_of_birth: user.dob,
        // mobile_phone: {
        //   country_code: -1,
        //   number: user.phoneNumber || "",
        // },
      },
      address_info: {
        address_1: user.address1,
        address_2: user.address2 || "",
        city: user.city,
        zip_code: user.zipcode,
      },
    };

    // Make signup request for each center
    const promises = centers.map(async (center) => {
      const {
        id: center_id,
        country: { code: countryCode },
      } = center;
      const result = await guestSignup(
        { ...data, center_id },
        countryCode as Organization
      );
      const { center_id: centerId, id } = result?.data as GuestType;
      const matchedCenter = centers.find((center) => center.id === centerId);
      if (!matchedCenter) {
        throw new Error("Failed to find matched center");
      }
      return {
        centerId: matchedCenter.id,
        countryCode: matchedCenter.country.code,
        guestId: id,
      };
    });

    console.log("Signup user in the Zenoti");
    const centersSignupData = await Promise.all(promises);

    const document = {
      userId: user.uid,
      guestAccounts: centersSignupData,
    };

    return await firestore.collection("zenotiGuests").doc().set(document);
  } catch (error) {
    console.error("Error during user signup in zenoti:", error);
    throw error;
  }
};
