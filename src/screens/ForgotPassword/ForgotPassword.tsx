import { Spacer } from "@/components/atoms";
import { forgotPasswordSchema } from "@/schema";
import { forgotPassword } from "@/services/firebase/auth";
import type { ApplicationScreenProps } from "@/types/navigation";
import { useFormik } from "formik";

import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button, useTheme } from "react-native-paper";

interface ForgotPasswordType {
  email: string;
}

function ForgotPassword({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme();
  const { errors, isValid, handleChange, values, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: forgotPasswordSchema,
      onSubmit: handleForgotPassword,
    });

  function handleForgotPassword() {
    // if(isValid)
    forgotPassword(values.email)
      .then(() =>
        setMessage("Password Reset Email Sent. Please check your inbox.")
      )
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.logo, { color: colors.primary }]}>
        Forgot Password
      </Text>
      <Spacer marginBottom={20} />
      <Text style={[{ color: colors.primary }]}>Reset your password</Text>
      <Text style={[{ color: colors.secondary }]}>
        Recover access to your account
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Registered email address"
          placeholderTextColor="#003f5c"
          onChangeText={handleChange("email")}
          autoCapitalize="none"
          inputMode="email"
          value={values.email}
          onBlur={handleBlur("email")}
        />
      </View>

      {/* {error && (
          <>
            <Text style={styles.error}>{error}</Text>
            <Spacer marginTop={20} />
          </>
        )} */}
      <Button mode="contained" onPress={handleSubmit}>
        Reset password
      </Button>
      {/* <CButton
        text="Reset Password"
        onPress={handleSubmit}
        // isLoading={isLoading}
        disabled={!isValid}
      /> */}
      <Spacer marginTop={20} />
      <Text>{errors.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 32,
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

export default ForgotPassword;
