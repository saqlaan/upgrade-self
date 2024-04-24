import axios from "../config/axiosConfig";

export const getBrainUpgradeUser = async (): Promise<{ userId: string } | null> => {
  try {
    const result = await axios.get("brain-upgrade/user");
    return result.data;
  } catch (error) {
    console.log(error);
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

export const getBrainUpgradeUserReports = async (): Promise<
  BrainUpgradeUserReport[] | null
> => {
  try {
    const result = await axios.get("brain-upgrade/reports");
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
