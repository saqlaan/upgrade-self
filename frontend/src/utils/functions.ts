import { Platform } from "react-native";
import { parseISO, format, addDays } from "date-fns";
import { SlotType } from "@/types";
import { getUserGuests } from "@/services/firebase/collections/guest";

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
    const hour = Number(format(time, "HH")); // Extract hour using date-fns
    const deviceHour = new Date().getHours();
    const isDateToday =
      format(obj.Time, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
    if (isDateToday && hour > deviceHour) {
      // Time should be greater then device time
      if (!groupedData[hour]) {
        groupedData[hour] = []; // Initialize array if it doesn't exist
      }
      groupedData[hour].push(obj);
    }
  });
  return groupedData;
}

export function formatHour(hour: number): string {
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(0);
  return format(date, "hh:mm a");
}

export const getGuestAccountByCountry = async (countryCode: string) => {
  const guests = await getUserGuests();
  return guests?.guestAccounts.find(
    (guest) => guest.countryCode === countryCode,
  );
};

export const getNextSevenDays = () => {
  // Get today's date
  const today = new Date();
  // Initialize an array to store the dates for the next 7 days
  const nextSevenDays = [];

  // Loop to generate the dates for each day
  for (let i = 0; i < 7; i++) {
    // Add i days to today's date to get the date for the current iteration
    const currentDate = addDays(today, i);

    // Add the date to the array
    nextSevenDays.push(currentDate);
  }
  return nextSevenDays;
};

// Input string = "(UTC-08:00) Pacific Time (US & Canada)";
export const extractUTCHours = (inputString: string) => {
  const offsetPattern = /UTC([-+]\d{2}):(\d{2})/;
  const [, hours, minutes] = offsetPattern.exec(inputString) || [];
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
};
