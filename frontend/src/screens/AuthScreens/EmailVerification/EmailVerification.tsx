import { CButton, Spacer } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import { sendEmailConfirmation } from "@/services/firebase/auth";
import { TextVariants } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AppTheme } from "@/types/theme";
import auth from "@react-native-firebase/auth";
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { openInbox } from "react-native-email-link";
import { Button, Icon, Text, useTheme } from "react-native-paper";

function EmailVerification({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme<AppTheme>();
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
    navigation.navigate("Login");
  }, []);

  return (
    <SafeScreen>
      <View style={styles.container}>
        <Icon size={100} source={"check"} color={colors.secondary}></Icon>
        <Spacer marginBottom={50} />
        <Text variant={TextVariants["display-xs-bold"]}>Check your email!</Text>
        <Spacer marginBottom={spacing[2]} />
        <Text
          style={{
            color: colors["black-300"],
            textAlign: "center",
          }}
          variant={TextVariants["text-md-medium"]}
        >
          {`We've just sent an email to you at ${user?.email || ""}. Tap on the
  link to verify you account`}
        </Text>
        <Spacer marginBottom={spacing[2]} />
        <View style={styles.forgotPasswordRow}>
          <Button disabled={isDisabled} mode="text" onPress={handleResendEmail}>
            <Text
              style={{ color: colors.secondary }}
              variant={TextVariants["text-md-semi-bold"]}
            >
              {isDisabled
                ? "Sent again. Try again in 30s"
                : `Didn't receive an email?`}
            </Text>
          </Button>
        </View>
      </View>
      <View
        style={{ paddingHorizontal: spacing[5], paddingBottom: spacing[5] }}
      >
        <Button disabled={isDisabled} mode="text" onPress={handleOnLogin}>
          <Text
            style={{ color: colors.secondary }}
            variant={TextVariants["text-md-semi-bold"]}
          >
            Verified? Back to login
          </Text>
        </Button>
        <Spacer marginBottom={spacing[2]} />
        <CButton onPress={handleOpenEmailApp}>
          <Text
            style={{ color: colors.white }}
            variant={TextVariants["text-md-semi-bold"]}
          >
            Open mail app
          </Text>
        </CButton>
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
