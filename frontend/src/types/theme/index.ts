import { MD3Theme } from "react-native-paper";
import { Colors } from "./colors";
import { Fonts } from "./fonts";
import { Spacing } from "./spacing";

export type AppTheme = MD3Theme & {
  colors: Colors;
  spacing: Spacing;
  fonts: Fonts;
};
