import {
  BackButton,
  CButton,
  CustomTextInput,
  Spacer,
} from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import { loginSchema } from "@/schema";
import { onSignup, signup } from "@/services/firebase/auth";
import firebaseErrors from "@/services/firebase/firebaseErrors";
import type { ApplicationScreenProps } from "@/types/navigation";
import { FormikHelpers, useFormik } from "formik";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { HelperText, Text, useTheme } from "react-native-paper";
import SocialLogin from "../components/SocialLogin/SocialLogin";

type SignupFormValues = {
  email: string;
  password: string;
};

function Signup({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme();
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
    },
    validationSchema: loginSchema,
    onSubmit: handleLogin,
  });

  function handleLogin(
    values: SignupFormValues,
    { setSubmitting, resetForm }: FormikHelpers<SignupFormValues>
  ) {
    signup({ ...values })
      .then(() => {
        resetForm();
        onSignup();
        navigation.navigate("EmailVerification");
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
        <BackButton />
        <View style={styles.container}>
          <Image
            style={{ width: "100%", objectFit: "contain" }}
            source={require("../../theme/assets/images/upgrade-labs-logo.png")}
          />
          <Spacer marginBottom={10} />
          <Text
            style={{ color: colors.secondary, fontWeight: "600" }}
            variant={"headlineLarge"}
          >
            Sign Up
          </Text>
          <Spacer marginBottom={10} />
          <Text variant={"titleMedium"}>Create your account</Text>
          <Spacer marginBottom={40} />
          <CustomTextInput
            placeholder="Username/Email"
            onChangeText={handleChange("email")}
            value={values.email}
            textContentType={"emailAddress"}
            onBlur={handleBlur("email")}
            error={touched.email && errors.email}
          />
          <Spacer marginTop={20} />
          <CustomTextInput
            placeholder="Password"
            onChangeText={handleChange("password")}
            value={values.password}
            textContentType={"password"}
            secureTextEntry
            onBlur={handleBlur("password")}
            error={touched.password && errors.password}
          />
          <Spacer marginTop={30} />
          <CButton
            disabled={!isValid || isSubmitting}
            onPress={handleSubmit}
            loading={isSubmitting}
          >
            Sign Up
          </CButton>
          {firebaseError && (
            <HelperText type="error" visible>
              {firebaseError}
            </HelperText>
          )}
          <SocialLogin />
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.center}
          >
            <Text>Already have an account? Login</Text>
          </TouchableOpacity>
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

export default Signup;
