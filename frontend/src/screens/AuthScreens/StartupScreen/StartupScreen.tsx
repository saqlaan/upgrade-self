import { IconButton, Spacer } from "@/components/atoms";
import { ArrowRight } from "@/theme/assets/icons";
import { Images } from "@/theme/assets/images";
import colors from "@/theme/colors";
import { TextVariants } from "@/theme/fonts";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AppTheme } from "@/types/theme";
import { isAndroid } from "@/utils/functions";
import React from "react";
import {
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Text, useTheme } from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import SocialLogin from "../components/SocialLogin/SocialLogin";

function Startup({ navigation }: ApplicationScreenProps) {
  const { colors, spacing } = useTheme<AppTheme>();
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {isAndroid && (
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      )}
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
              <Spacer marginBottom={spacing[2]} />
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
            <SocialLogin />
            <Spacer marginBottom={spacing[6]} />
            <IconButton
              mode="contained"
              onPress={() => navigation.navigate("TOSScreen")}
              icon={<ArrowRight width={24} height={24} />}
            >
              <Text
                variant={TextVariants["text-md-semi-bold"]}
                style={{ color: colors.white }}
              >
                Get Started
              </Text>
            </IconButton>
            <Spacer marginBottom={spacing[6]} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: spacing[6],
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
              <Pressable onPress={() => navigation.navigate("LoginScreen")}>
                <Text
                  variant={TextVariants["text-md-bold"]}
                  style={{ color: colors.secondary }}
                >
                  Log in
                </Text>
              </Pressable>
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
    top: -3,
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
});

export default Startup;
