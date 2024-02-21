import { CButton } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import type { ApplicationScreenProps } from "@/types/navigation";
import auth from "@react-native-firebase/auth";
import React from "react";
import { StyleSheet } from "react-native";

function Login({ navigation }: ApplicationScreenProps) {
  return (
    <SafeScreen>
      <CButton onPress={() => auth().signOut()}>Logout</CButton>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 20,
  },
  error: {
    fontSize: 14,
    color: "black",
  },
  forgotPasswordRow: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
  },
});

export default Login;
