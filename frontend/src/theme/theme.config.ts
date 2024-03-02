import { AppTheme } from "@/types/theme";
import {
  MD3LightTheme as DefaultTheme,
  configureFonts,
} from "react-native-paper";
import colors from "./colors";
import { fontConfig } from "./fonts";
import { spacing } from "./spacing";

export const theme: AppTheme = {
  ...DefaultTheme,
  colors: colors,
  fonts: configureFonts({ config: fontConfig }),
  spacing,
};
