import { CButton, Spacer } from "@/components/atoms";
import { Images } from "@/theme/assets/images";
import type { ApplicationScreenProps } from "@/types/navigation";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function Startup({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.StartUpImage}
        resizeMode={"cover"}
        style={styles.image}
      >
        <SafeAreaView style={styles.safeContainer}>
          <View>
            <Text
              style={{ color: colors.secondary, fontWeight: "600" }}
              variant={"displayMedium"}
            >
              Welcome to ULF
            </Text>
            <Spacer marginBottom={10} />
            <Text
              style={{ color: colors.background }}
              variant={"headlineMedium"}
            >
              Engage with the Biohacking Experience
            </Text>
            <Spacer marginBottom={40} />
            <View style={{ flexDirection: "row" }}>
              <CButton
                mode="contained"
                onPress={() => navigation.navigate("Login")}
                buttonColor={colors.secondary}
              >
                Get Started
              </CButton>
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
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#00000075",
    justifyContent: "flex-end",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#ccc",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#003f5c",
  },
  error: {
    fontSize: 14,
    color: "black",
  },
  forgotPasswordRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    // alignItems: "flex-end",
  },
});

export default Startup;
