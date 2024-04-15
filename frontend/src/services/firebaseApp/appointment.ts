import axios from "../config/axiosConfig";
import { PageInfo, ZenotiService } from "@/types";

interface GetServicesType {
  services: ZenotiService[];
  page_info: PageInfo;
}

export const getServices = async ({
  centerId,
  countryCode,
}: {
  centerId?: string;
  countryCode?: string;
}): Promise<GetServicesType | null> => {
  try {
    const result = await axios.get(
      `zenoti/getServices?centerId=${centerId}&countryCode=${countryCode}`,
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
