import { CenterType, Organization } from "@/types";
import axios, { requestHeaders } from "../config/axiosConfig";
axios;

export const fetchCenters = async (organization: Organization) => {
  return axios.get("/centers?expand=working_hours", {
    headers: requestHeaders[organization],
  });
};

export const fetchAllCentersData = async (): Promise<CenterType[] | null> => {
  try {
    let allCenters = [];
    let result = null;
    result = await fetchCenters(Organization.US);
    allCenters.push(...result.data?.centers);
    result = await fetchCenters(Organization.CANADA);
    allCenters.push(...result.data?.centers);
    allCenters = allCenters.map(({ id, name, display_name, country }) => ({
      id,
      name,
      display_name,
      country,
    }));
    return allCenters;
  } catch (error) {
    console.log(error);
    return null;
  }
};
