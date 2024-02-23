import type { PropsWithChildren } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

function SafeScreen({ children }: PropsWithChildren) {
  const { colors, dark } = useTheme();
  return (
    <SafeAreaView style={[styles.view, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default SafeScreen;
