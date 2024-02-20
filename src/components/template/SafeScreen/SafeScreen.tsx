import type { PropsWithChildren } from "react";
import { useTheme } from "react-native-paper";

function SafeScreen({ children }: PropsWithChildren) {
  // const { layout, variant, navigationTheme } = useTheme();
  const { colors } = useTheme();
}

export default SafeScreen;
