import { FormikHelpers, useFormik } from "formik";
import React, { useState } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import {
  BackButton,
  CButton,
  CustomTextInput,
  Spacer,
} from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import { signupSchema } from "@/schema";
import { onSignup, signup } from "@/services/firebase/auth";
import firebaseErrors from "@/services/firebase/firebaseErrors";
import { LetterIcon, LockIcon } from "@/theme/assets/icons";
import { TextVariants } from "@/theme/fonts";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AppTheme } from "@/types/theme";

type SignupFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

function Signup({ navigation }: ApplicationScreenProps) {
  const { colors, spacing } = useTheme<AppTheme>();
  const [firebaseError, setFirebaseError] = useState<string>("");

  const {
    errors,
    isValid,
    handleChange,
    values,
    handleBlur,
    handleSubmit,
    isSubmitting,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: handleLogin,
  });

  function handleLogin(
    values: SignupFormValues,
    { setSubmitting }: FormikHelpers<SignupFormValues>,
  ) {
    signup({ ...values })
      .then(() => {
        onSignup();
        navigation.replace("EmailVerificationScreen");
      })
      .catch((error) => {
        if (error.code) {
          setFirebaseError(firebaseErrors[error.code]);
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return (
    <SafeScreen>
      <ScrollView>
        <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
        <View style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            <BackButton color={colors.primary} />
          </View>
          <Spacer marginBottom={spacing[4]} />
          <Text variant={TextVariants["display-xs-bold"]}>Sign up</Text>
          <Spacer marginBottom={spacing[4]} />
          <CustomTextInput
            label="Email address"
            placeholder="Username/Email"
            onChangeText={handleChange("email")}
            value={values.email}
            textContentType={"emailAddress"}
            onBlur={handleBlur("email")}
            error={touched.email && errors.email}
            icon={<LetterIcon width={spacing[6]} height={spacing[6]} />}
          />
          <Spacer marginBottom={spacing[4]} />
          <CustomTextInput
            label="Password"
            placeholder="Password"
            onChangeText={handleChange("password")}
            value={values.password}
            textContentType={"password"}
            onBlur={handleBlur("password")}
            error={touched.password && errors.password}
            icon={<LockIcon width={spacing[6]} height={spacing[6]} />}
            inputHints={[
              "Minimum of 8 characters",
              "Uppercase, Lowercase letters, and one number",
            ]}
          />
          <Spacer marginBottom={spacing[4]} />
          <CustomTextInput
            label="Confirm password"
            placeholder="Password"
            onChangeText={handleChange("confirmPassword")}
            value={values.confirmPassword}
            textContentType={"password"}
            onBlur={handleBlur("confirmPassword")}
            error={touched.confirmPassword && errors.confirmPassword}
            icon={<LockIcon width={spacing[6]} height={spacing[6]} />}
          />
        </View>
      </ScrollView>
      <View
        style={{ paddingHorizontal: spacing[5], paddingBottom: spacing[5] }}
      >
        {firebaseError && (
          <Text
            style={{ color: colors.error, textAlign: "center" }}
            variant={TextVariants["text-xs-bold"]}
          >
            {firebaseError}
          </Text>
        )}
        <Spacer marginBottom={spacing[2]} />
        <CButton
          disabled={!isValid || isSubmitting}
          onPress={handleSubmit}
          loading={isSubmitting}
        >
          <Text
            style={{ color: colors.white }}
            variant={TextVariants["text-md-semi-bold"]}
          >
            Next
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
    padding: 20,
    paddingTop: 20,
  },
});

export default Signup;
