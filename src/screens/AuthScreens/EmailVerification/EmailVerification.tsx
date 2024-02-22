import { CButton, Spacer } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import { sendEmailConfirmation } from "@/services/firebase/auth";
import type { ApplicationScreenProps } from "@/types/navigation";
import auth from "@react-native-firebase/auth";
import React, { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { openInbox } from "react-native-email-link";
import { Button, Icon, Text, useTheme } from "react-native-paper";

function EmailVerification({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme();
  const [isDisabled, setIsDisabled] = useState(false);
  const user = auth().currentUser;

  const handleOpenEmailApp = useCallback(() => openInbox(), []);

  const handleResendEmail = useCallback(() => {
    setIsDisabled(true);
    sendEmailConfirmation().then(() => {
      setTimeout(() => setIsDisabled(false), 30000);
    });
  }, []);

  const handleOnLogin = useCallback(() => {
    auth().signOut();
  }, []);

  return (
    <SafeScreen>
      <View style={styles.container}>
        <Icon size={100} source={"check"} color={colors.secondary}></Icon>
        <Spacer marginBottom={50} />
        <Text
          style={{ color: colors.secondary, fontWeight: "600" }}
          variant={"headlineLarge"}
        >
          Check your email!
        </Text>
        <Spacer marginTop={25} />
        <Text variant={"titleMedium"} style={{ textAlign: "center" }}>
          {`We've just sent an email to you at ${user?.email || ""}. Tap on the
  link to verify you account`}
        </Text>
        <Spacer marginTop={30} />
        <View style={styles.forgotPasswordRow}>
          <Button disabled={isDisabled} mode="text" onPress={handleResendEmail}>
            <Text style={{ color: colors.primary }}>
              {isDisabled
                ? "Sent again. Try again in 30s"
                : `Didn't receive an email?`}
            </Text>
          </Button>
        </View>

        <Spacer marginTop={40} />
        <CButton onPress={handleOpenEmailApp}>Open mail app</CButton>
        <Spacer marginTop={20} />
        <TouchableOpacity onPress={handleOnLogin} style={styles.center}>
          <Text>Verified? Back to login</Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
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

export default EmailVerification;
