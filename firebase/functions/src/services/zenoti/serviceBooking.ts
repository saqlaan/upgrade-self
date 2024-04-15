import axios from "../../config/axiosConfig";
import { Organization, requestHeaders } from "../../config/zenotiConfig";

export const getCenterServices = async ({
  organization,
  centerId,
  page = 1,
  size = 20,
}: {
  organization: Organization;
  centerId: string;
  page?: number;
  size?: number;
}) => {
  try {
    const response = await axios.get(`/centers/${centerId}/services`, {
      params: { page, size },
      headers: requestHeaders[organization],
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to retrieve center services");
  }
};
