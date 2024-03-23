import React from "react";
import { StyleSheet } from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { colors } from "@/theme";

function SafeScreen({ children, ...props }: SafeAreaViewProps) {
  return (
    <SafeAreaView
      style={[styles.view, { backgroundColor: colors.white }]}
      {...props}
    >
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
