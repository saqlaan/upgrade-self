import {
  AppleSignIn,
  CButton,
  GoogleSignInButton,
  Spacer,
} from "@/components/atoms";
import { Images } from "@/theme/assets/images";
import colors from "@/theme/colors";
import { TextVariants } from "@/theme/fonts";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AppTheme } from "@/types/theme";
import React from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Text, useTheme } from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

function Startup({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme<AppTheme>();
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.StartBgImage}
        resizeMode={"cover"}
        style={styles.image}
      >
        <SafeAreaView edges={["top"]} style={styles.safeContainer}>
          <LinearGradient
            colors={[
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "rgba(255, 255, 255, 0.80)",
              "rgba(255, 255, 255, 0.30)",
              "rgba(255, 255, 255, 0.00)",
            ]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
          >
            <View style={[styles.welcomeSection]}>
              <Text
                variant={TextVariants["display-xs-bold"]}
                style={styles.headingText}
              >
                Welcome to the Upgrade Labs app!
              </Text>
              <Spacer marginBottom={10} />
              <Text
                style={[styles.headingText, { color: colors["black-300"] }]}
                variant={TextVariants["text-md-medium"]}
              >
                Engage with the Biohacking Experience
              </Text>
            </View>
          </LinearGradient>
          <View
            style={[
              styles.bottomSection,
              { backgroundColor: colors.white, paddingBottom: bottom },
            ]}
          >
            <View style={styles.socialButtonsSections}>
              <View style={{ flex: 1 }}>
                <GoogleSignInButton />
              </View>
              <View style={{ flex: 1 }}>
                <AppleSignIn />
              </View>
            </View>
            <CButton
              mode="contained"
              onPress={() => navigation.navigate("Signup")}
            >
              <Text
                variant={TextVariants["text-md-semi-bold"]}
                style={{ color: colors.white }}
              >
                Get Started
              </Text>
            </CButton>
            <Spacer marginBottom={24} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                variant={TextVariants["text-sm-regular"]}
                style={{
                  textAlign: "center",
                  color: colors["black-200"],
                  marginRight: 2,
                }}
              >
                Already have an account?
              </Text>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text
                  variant={TextVariants["text-md-bold"]}
                  style={{ color: colors.secondary }}
                >
                  Log in
                </Text>
              </Pressable>
              <Spacer marginBottom={36} />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  welcomeSection: {
    padding: 25,
    paddingTop: 80,
    paddingBottom: 10,
  },
  bottomSection: {
    padding: 16,
  },
  headingText: {
    color: colors["black-900"],
    textAlign: "center",
  },
  socialButtonsSections: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    marginBottom: 24,
  },
});

export default Startup;
