import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { CButton, GoogleSignInButton, Spacer } from "@/components/atoms";
import { signup } from "@/services/firebase/auth";
import firebaseErrors from "@/services/firebase/firebaseErrors";
import type { ApplicationScreenProps } from "@/types/navigation";

function Signup({ navigation }: ApplicationScreenProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignup = () => {
    setIsLoading(true);
    signup({ email, password })
      .then()
      .catch((error) => {
        if (error.code) {
          setError(firebaseErrors[error.code]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sign Up</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          inputMode="email"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      {error && (
        <>
          <Text style={styles.error}>{error}</Text>
          <Spacer marginTop={20} />
        </>
      )}
      <CButton
        variant="primary"
        text="Sign Up"
        onPress={handleSignup}
        isLoading={isLoading}
      />
      <Spacer marginTop={40} />
      <CButton
        variant="default"
        text="Log In"
        onPress={() => navigation.navigate("Login")}
      />
      <Spacer marginTop={20} />
      <GoogleSignInButton />
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
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  error: {
    fontSize: 14,
    color: "black",
  },
});

export default Signup;
