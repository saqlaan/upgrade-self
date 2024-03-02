import { AppleSignIn, GoogleSignInButton } from "@/components/atoms";
import React from "react";
import { StyleSheet, View } from "react-native";

function SocialLogin() {
  return (
    <View style={styles.socialButtonsSections}>
      <View style={{ flex: 1 }}>
        <GoogleSignInButton />
      </View>
      <View style={{ flex: 1 }}>
        <AppleSignIn />
      </View>
    </View>
  );
}

export default SocialLogin;

const styles = StyleSheet.create({
  socialButtonsSections: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
  },
});
