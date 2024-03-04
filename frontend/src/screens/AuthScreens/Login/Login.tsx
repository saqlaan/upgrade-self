import {
  BackButton,
  CButton,
  CustomTextInput,
  Spacer,
} from "@/components/atoms";
import { loginSchema } from "@/schema";
import { login } from "@/services/firebase/auth";
import firebaseErrors from "@/services/firebase/firebaseErrors";
import { LetterIcon, LockIcon, UlAppIconSingle } from "@/theme/assets/icons";
import { Images } from "@/theme/assets/images";
import colors from "@/theme/colors";
import { TextVariants } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AppTheme } from "@/types/theme";
import auth from "@react-native-firebase/auth";
import { FormikHelpers, useFormik } from "formik";
import React, { useCallback, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import SocialLogin from "../components/SocialLogin/SocialLogin";

type LoginFormValues = {
  email: string;
  password: string;
};

function Login({ navigation }: ApplicationScreenProps) {
  const { colors, spacing } = useTheme<AppTheme>();
  const [firebaseError, setFirebaseError] = useState<string>("");
  const { top } = useSafeAreaInsets();

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
    values: LoginFormValues,
    { setSubmitting, resetForm, setTouched }: FormikHelpers<LoginFormValues>
  ) {
    login({ ...values })
      .then(() => {
        const user = auth().currentUser;
        if (!user?.emailVerified) {
          setTouched({ password: false });
          resetForm();
          navigation.navigate("EmailVerification");
        }
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

  const handleForgotPassword = useCallback(() => {
    navigation.navigate("ForgotPassword");
  }, []);

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ backgroundColor: colors.white, flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          style={[styles.topSection, { paddingTop: top }]}
          source={Images.LoginTopSectionBg}
        >
          <View style={{ flexDirection: "row", position: "relative" }}>
            <BackButton />
            <View style={[styles.appIconWrapper]}>
              <UlAppIconSingle />
            </View>
          </View>
        </ImageBackground>
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{ color: colors["black-900"] }}
              variant={TextVariants["display-xs-bold"]}
            >
              Login
            </Text>
            <Spacer marginBottom={10} />
            <Text
              style={{
                color: colors["black-300"],
                paddingHorizontal: 20,
                textAlign: "center",
              }}
              variant={TextVariants["text-md-medium"]}
            >
              Enter your credentials to login to your account.
            </Text>
          </View>
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
          <Spacer marginTop={spacing[4]} />
          <CustomTextInput
            label="Password"
            placeholder="Password"
            onChangeText={handleChange("password")}
            value={values.password}
            textContentType={"password"}
            onBlur={handleBlur("password")}
            error={touched.password && errors.password}
            icon={<LockIcon width={spacing[6]} height={spacing[6]} />}
          />
          <Spacer marginTop={spacing[6]} />
          <CButton
            disabled={!isValid || isSubmitting}
            onPress={handleSubmit}
            loading={isSubmitting}
          >
            <Text
              style={{ color: colors.white }}
              variant={TextVariants["text-md-semi-bold"]}
            >
              Login
            </Text>
          </CButton>
          <Spacer marginTop={spacing[4]} />
          <View style={styles.forgotPasswordRow}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text
                style={{ color: colors.secondary }}
                variant={TextVariants["text-md-semi-bold"]}
              >
                Forgot your Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={styles.center}
          >
            <Text variant={TextVariants["text-sm-regular"]}>
              Don't have an account? Signup
            </Text>
          </TouchableOpacity>
          <Spacer marginTop={spacing[4]} />
          <SocialLogin />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topSection: {
    flex: 1,
    paddingHorizontal: spacing[4],
    justifyContent: "center",
    paddingBottom: spacing[4],
    minHeight: 100,
  },
  backButton: {
    padding: spacing[2],
    borderWidth: 1,
    borderColor: colors["black-50"],
    width: "auto",
    borderRadius: spacing[2],
    zIndex: 9999,
    backgroundColor: "rgba(233, 232, 238, 0.10);",
  },
  appIconWrapper: {
    flex: 1,

    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: spacing[5],
    paddingTop: spacing[5],
    borderTopLeftRadius: spacing[4],
    borderTopRightRadius: spacing[4],
    position: "relative",
    top: -spacing[4],
  },
  error: {
    fontSize: 14,
    color: "black",
  },
  forgotPasswordRow: {
    justifyContent: "center",
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
  },
});

export default Login;
