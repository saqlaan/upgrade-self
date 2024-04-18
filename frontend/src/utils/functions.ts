import { Platform } from "react-native";
import { parseISO, format } from "date-fns";
import { SlotType } from "@/types";

export const isAndroid = Platform.OS === "android";

export const isIOS = Platform.OS === "ios";

export const getCalendar = () => {
  const months = [];
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  for (let month = 0; month < 12; month++) {
    const year = new Date().getFullYear();

    const monthData = {
      name: new Date(year, month).toLocaleString("default", {
        month: "long",
      }),
      days: [],
    };

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      monthData.days.push({ day: day, dayOfWeek: daysOfWeek[dayOfWeek] });
    }

    months.push(JSON.stringify(monthData));
  }
  return months;
};

// Define a type for the grouped object
type GroupSlotsTogether = { [hour: string]: SlotType[] };

// Function to group objects by hour using date-fns
export function groupSlotsTogether(data: SlotType[]): GroupSlotsTogether {
  const groupedData: GroupSlotsTogether = {};
  data.forEach((obj) => {
    const time = parseISO(obj.Time);
    const hour = format(time, "HH"); // Extract hour using date-fns
    if (!groupedData[hour]) {
      groupedData[hour] = []; // Initialize array if it doesn't exist
    }
    groupedData[hour].push(obj);
  });
  return groupedData;
}

export function formatHour(hour: number): string {
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(0);
  return format(date, "hh:mm a");
}
