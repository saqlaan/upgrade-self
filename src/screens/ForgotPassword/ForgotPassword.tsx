import {
  BackButton,
  CButton,
  CustomTextInput,
  Spacer,
} from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import { forgotPasswordSchema } from "@/schema";
import { forgotPassword } from "@/services/firebase/auth";
import type { ApplicationScreenProps } from "@/types/navigation";
import { FormikHelpers, useFormik } from "formik";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { HelperText, Text } from "react-native-paper";

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
    // if(isValid)
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
        <BackButton title="Forgot Password" />
        <View style={styles.container}>
          <Spacer marginBottom={20} />
          <Text variant={"titleMedium"}>Reset your password</Text>
          <Spacer marginBottom={5} />
          <Text>Recover access to your account</Text>
          <Spacer marginBottom={20} />
          <CustomTextInput
            placeholder="Registered Email Address"
            onChangeText={handleChange("email")}
            value={values.email}
            textContentType={"emailAddress"}
            onBlur={handleBlur("email")}
            error={touched.email && errors.email}
          />
          <Spacer marginTop={30} />
          <CButton
            disabled={!isValid || isSubmitting}
            onPress={handleSubmit}
            loading={isSubmitting}
          >
            Reset Password
          </CButton>
          <Spacer marginTop={20} />
          {message && (
            <HelperText type="info" visible>
              {message}
            </HelperText>
          )}
        </View>
      </ScrollView>
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
