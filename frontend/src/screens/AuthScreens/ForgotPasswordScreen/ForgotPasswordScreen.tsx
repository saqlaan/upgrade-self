import {
  BackButton,
  CButton,
  CustomTextInput,
  Spacer,
} from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import { forgotPasswordSchema } from "@/schema";
import { forgotPassword } from "@/services/firebase/auth";
import { LetterIcon } from "@/theme/assets/icons";
import colors from "@/theme/colors";
import { TextVariants } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";
import type { ApplicationScreenProps } from "@/types/navigation";
import { FormikHelpers, useFormik } from "formik";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface ForgotPassworkFormValues {
  email: string;
}

function Login({ navigation }: ApplicationScreenProps) {
  const [message, setMessage] = useState<string>("");

  const {
    errors,
    isValid,
    handleChange,
    values,
    handleBlur,
    handleSubmit,
    isSubmitting,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: handleForgotPassword,
  });

  function handleForgotPassword(
    values: ForgotPassworkFormValues,
    { setSubmitting, resetForm }: FormikHelpers<ForgotPassworkFormValues>
  ) {
    forgotPassword(values.email)
      .then(() => {
        resetForm();
        setMessage("Password reset email sent. Please check your inbox");
      })
      .catch((error) => {
        setMessage("Something went wrong. Please try again latter.");
      })
      .finally(() => setSubmitting(false));
  }

  return (
    <SafeScreen>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            <BackButton color={colors.primary} />
          </View>
          <Spacer marginBottom={spacing[4]} />
          <Text variant={TextVariants["display-xs-bold"]}>Reset password</Text>
          <Spacer marginBottom={spacing[2]} />
          <Text
            style={{ color: colors["black-300"] }}
            variant={TextVariants["text-md-medium"]}
          >
            Enter the email address you registered with ULF.{" "}
          </Text>
          <Spacer marginBottom={spacing[6]} />
          <CustomTextInput
            icon={<LetterIcon width={spacing[6]} height={spacing[6]} />}
            label="Email address"
            placeholder="Registered Email Address"
            onChangeText={handleChange("email")}
            value={values.email}
            textContentType={"emailAddress"}
            onBlur={handleBlur("email")}
            error={touched.email && errors.email}
          />
        </View>
      </ScrollView>
      <View
        style={{ paddingHorizontal: spacing[5], paddingBottom: spacing[5] }}
      >
        {message && (
          <>
            <Text
              style={{ color: colors["black-300"], textAlign: "center" }}
              variant={TextVariants["text-xs-bold"]}
            >
              {message}
            </Text>
          </>
        )}
        <Spacer marginBottom={spacing[5]} />
        <CButton
          disabled={!isValid || isSubmitting}
          onPress={handleSubmit}
          loading={isSubmitting}
        >
          <Text
            style={{ color: colors.white }}
            variant={TextVariants["text-md-semi-bold"]}
          >
            Send verification
          </Text>
        </CButton>
        <Spacer marginBottom={spacing[2]} />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
});

export default Login;
