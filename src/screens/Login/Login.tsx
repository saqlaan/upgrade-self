import {
  AppleSignIn,
  CButton,
  GoogleSignInButton,
  Spacer,
} from "@/components/atoms";
import { login } from "@/services/firebase/auth";
import firebaseErrors from "@/services/firebase/firebaseErrors";
import type { ApplicationScreenProps } from "@/types/navigation";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

function Login({ navigation }: ApplicationScreenProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = () => {
    setIsLoading(true);
    login({ email, password })
      .then()
      .catch((error) => {
        if (error.code) {
          setError(firebaseErrors[error.code]);
        }
      })
      .finally(() => {
        resetForm();
        setIsLoading(false);
      });
  };

  const resetForm = useCallback(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleOnBlur = useCallback(() => {
    setError("");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Login</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          inputMode="email"
          value={email}
          onBlur={handleOnBlur}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
          value={password}
          onBlur={handleOnBlur}
        />
      </View>
      {error && (
        <>
          <Text style={styles.error}>{error}</Text>
          <Spacer marginTop={20} />
        </>
      )}
      <CButton text="Login" onPress={handleLogin} isLoading={isLoading} />
      <Spacer marginTop={40} />
      <GoogleSignInButton />
      <Spacer marginTop={20} />
      <AppleSignIn />
      <Spacer marginTop={20} />
      <CButton
        variant="default"
        text="Sign up"
        onPress={() => navigation.navigate("Signup")}
      />
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
  error: {
    fontSize: 14,
    color: "black",
  },
});

export default Login;
