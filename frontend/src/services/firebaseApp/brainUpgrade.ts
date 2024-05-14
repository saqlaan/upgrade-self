import axios from "../config/axiosConfig";

export const getBrainUpgradeUser = async (): Promise<{ userId: string } | null> => {
  try {
    const result = await axios.get("brain-upgrade/user");
    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export type BrainUpgradeUserReport = {
  startAt: string;
  endAt: string;
  alphaScore: number;
  alphaTime: number;
  baselinePeakAlpha: number;
};

export const getBrainUpgradeUserReports = async (
  params: { limit: number | null } | undefined,
): Promise<BrainUpgradeUserReport[] | null> => {
  try {
    let url = "brain-upgrade/reports";
    if (params?.limit) {
      url += `?limit=${params?.limit}`;
    }
    const result = await axios.get(url);
    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
