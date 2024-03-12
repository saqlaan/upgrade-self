import axios from "../../config/axiosConfig";
import { Organization, requestHeaders } from "../../config/zenotiConfig";
import { CenterType } from "../../types";

export const getCenters = async (organization: Organization) => {
  return axios.get("/centers?expand=working_hours", {
    headers: requestHeaders[organization],
  });
};

export const getAllCentersData = async (): Promise<CenterType[] | null> => {
  try {
    let allCenters = [];
    let result = null;
    result = await getCenters(Organization.US);
    allCenters.push(...result.data?.centers);
    result = await getCenters(Organization.CANADA);
    allCenters.push(...result.data?.centers);
    return allCenters;
  } catch (error) {
    console.log(error);
    return null;
  }
};
