import { updateUserCollectionDoc } from "../services/firebase/userCollection";
import { createZenotiGuestDoc } from "../services/firebase/zenotiGuestsCollection";
import { getZenotiUserFromAllOrganizations, guestSignup } from "../services/zenoti";
import { FirestoreUserType, GuestType } from "../types";
import { CountryCodes } from "../types/enums/countryCode";
import { mapZenotiUserDataToFirestore } from "../utils";

export default async function handleExistingZenotiUser(before: FirestoreUserType | null, after: FirestoreUserType) {
  try {
    let zenotiAccounts = await getZenotiUserFromAllOrganizations({ email: after.email });
    if (zenotiAccounts.length === 0) return null;
    if (zenotiAccounts.length > 0) {
      const data = mapZenotiUserDataToFirestore(zenotiAccounts[0]);
      await updateUserCollectionDoc(after.uid, {
        ...data,
        zenotiIntegration: {
          signedUp: true,
        },
        centers: [
          {
            centerId: zenotiAccounts[0].center_id,
            countryCode: zenotiAccounts[0].countryCode,
            name: zenotiAccounts[0]?.center_name || "",
          },
        ],
      });
    }
    // If user have only one account, then sign up in the other country
    const accountInCountriesList = [...new Set(zenotiAccounts.map((zenotiAccount) => zenotiAccount.countryCode))];
    let hasNewAccountCreated = null;
    if (accountInCountriesList.length === 1) {
      if (accountInCountriesList[0] == CountryCodes.US) {
        hasNewAccountCreated = await signupUserInZenoti(zenotiAccounts[0], CountryCodes.CA);
      } else {
        hasNewAccountCreated = await signupUserInZenoti(zenotiAccounts[0], CountryCodes.US);
      }
    }
    // If the guest account was created in the previous step the pull the fresh data
    if (!!hasNewAccountCreated) {
      zenotiAccounts = await getZenotiUserFromAllOrganizations({ email: after.email });
    }
    // Link all the user guest account to the firebase guestAccounts collection
    const guestAccounts = zenotiAccounts.map(({ center_id, id, countryCode }) => ({
      centerId: center_id,
      guestId: id || "",
      countryCode: countryCode,
    }));
    await createZenotiGuestDoc({
      guestAccounts,
      userId: after.uid,
    });
    console.log(`WoW all zenoti accouts of the user linked to firestore`);
    return null;
  } catch (e) {
    console.log("Something went wrong: ", e);
    throw e;
  }
}

const signupUserInZenoti = async (user: GuestType, countryCode: CountryCodes) => {
  try {
    const { personal_info, address_info, center_name } = user;
    const data = {
      personal_info,
      address_info,
      center_id: countryCode === CountryCodes.US ? process.env.US_CENTER_ID || "" : process.env.CA_CENTER_ID || "",
      center_name,
    };
    const results = await guestSignup(data, countryCode);
    console.log(`WoW user signed up in other country i.e. ${countryCode} too`);
    return results;
  } catch (e) {
    throw e;
  }
};
