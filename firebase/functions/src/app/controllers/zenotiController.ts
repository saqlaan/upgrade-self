import { Request, Response } from "express";
import { getAllCentersData } from "../../services/zenoti";

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
