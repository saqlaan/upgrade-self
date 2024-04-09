import { Platform } from "react-native";

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
