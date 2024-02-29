import axios from "../../config/axiosConfig";
import { Organization, requestHeaders } from "../../config/zenotiConfig";
import { AllOrganizationCentersType } from "../../types";

export const getCenters = async (organization: Organization) => {
  return axios.get("/centers?expand=working_hours", {
    headers: requestHeaders[organization],
  });
};

export const getAllCentersData =
  async (): Promise<AllOrganizationCentersType | null> => {
    try {
      let centersData: AllOrganizationCentersType = {};
      let result = null;
      result = await getCenters(Organization.US);
      centersData = {
        [Organization.US]: result.data?.centers,
      };
      result = await getCenters(Organization.CANADA);
      centersData = {
        ...centersData,
        [Organization.CANADA]: result.data?.centers,
      };
      return centersData;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
