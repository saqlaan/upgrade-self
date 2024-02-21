import { CButton, CustomTextInput, Spacer } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import { loginSchema } from "@/schema";
import { login } from "@/services/firebase/auth";
import firebaseErrors from "@/services/firebase/firebaseErrors";
import type { ApplicationScreenProps } from "@/types/navigation";
import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { HelperText, Text, useTheme } from "react-native-paper";
import SocialLogin from "../components/SocialLogin/SocialLogin";

function Login({ navigation }: ApplicationScreenProps) {
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

  function handleLogin(values, { setSubmitting }) {
    login({ ...values })
      .then()
      .catch((error) => {
        if (error.code) {
          setFirebaseError(firebaseErrors[error.code]);
        }
        setSubmitting(false);
      });
  }

  const handleForgotPassword = useCallback(() => {
    navigation.navigate("ForgotPassword");
  }, []);

  return (
    <SafeScreen>
      <ScrollView>
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
            Welcome Back
          </Text>
          <Text variant={"titleMedium"}>Log in to Your Account</Text>
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
          <Spacer marginTop={20} />
          <View style={styles.forgotPasswordRow}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text
                style={{ fontWeight: "500", color: colors.textColor }}
                variant="bodySmall"
                onPress={handleForgotPassword}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
          <HelperText type="error" visible={!!firebaseError}>
            {firebaseError}
          </HelperText>
          <Spacer marginTop={30} />
          <CButton
            disabled={!isValid}
            onPress={handleSubmit}
            loading={isSubmitting}
          >
            Sign In
          </CButton>
          <SocialLogin />
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={styles.center}
          >
            <Text>Don't have an account? Signup</Text>
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

export default Login;
