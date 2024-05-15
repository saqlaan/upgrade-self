import React, { useState } from "react";
import { Formik, FormikHelpers, FormikValues } from "formik";
import {
  Keyboard,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "react-native-paper";
import { AppTheme } from "@/types/theme";
import type { ApplicationScreenProps } from "@/types/navigation";
import { SafeScreen } from "@/components/template";
import {
  AndroidScreenTopSpace,
  Box,
  CButton,
  CustomTextInput,
  Text,
} from "@/components/atoms";
import { ProfileScreenHeader } from "@/components";
import { ChangePasswordValuesType } from "@/types";
import changePasswordSchema from "@/schema/changePassword.schema";
import { LockIcon } from "@/theme/assets/icons";
import { spacing } from "@/theme";
import { updatePassword } from "@/services/firebase/auth";
import firebaseErrors from "@/services/firebase/firebaseErrors";

const initialValues: ChangePasswordValuesType = {
  currentPassword: "",
  confirmPassword: "",
  newPassword: "",
};

function ChangePasswordScreen({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme<AppTheme>();
  const [requestError, setRequestError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const _onSubmit = (
    values: FormikValues,
    { setSubmitting, resetForm }: FormikHelpers<ChangePasswordValuesType>
  ) => {
    updatePassword({ ...values })
      .then(() => {
        resetForm();
        setRequestError("");
        setIsSuccess(true);
      })
      .catch((error) => {
        if (error.code) {
          setRequestError(firebaseErrors[error.code]);
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeScreen edges={["top"]}>
        <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
        <AndroidScreenTopSpace />
        <Formik<ChangePasswordValuesType>
          initialValues={initialValues}
          validationSchema={changePasswordSchema}
          onSubmit={_onSubmit}
        >
          {({
            handleSubmit,
            isSubmitting,
            isValid,
            touched,
            handleChange,
            handleBlur,
            values,
            errors,
          }) => (
            <Box flex={1}>
              <ProfileScreenHeader title="Change Password" />
              <ScrollView>
                <Box px="5" flex={1}>
                  <Box mb="2">
                    <CustomTextInput
                      label="Current Password"
                      placeholder="Password"
                      onChangeText={handleChange("currentPassword")}
                      value={values.currentPassword}
                      textContentType={"password"}
                      onBlur={handleBlur("currentPassword")}
                      error={touched.currentPassword && errors.currentPassword}
                      icon={<LockIcon width={spacing[6]} height={spacing[6]} />}
                    />
                  </Box>
                  <Box mb="2">
                    <CustomTextInput
                      label="New Password"
                      placeholder="Password"
                      onChangeText={handleChange("newPassword")}
                      value={values.newPassword}
                      textContentType={"password"}
                      onBlur={handleBlur("newPassword")}
                      error={touched.newPassword && errors.newPassword}
                      icon={<LockIcon width={spacing[6]} height={spacing[6]} />}
                    />
                  </Box>
                  <Box mb="2">
                    <CustomTextInput
                      label="Confirm Password"
                      placeholder="Password"
                      onChangeText={handleChange("confirmPassword")}
                      value={values.confirmPassword}
                      textContentType={"password"}
                      onBlur={handleBlur("confirmPassword")}
                      error={touched.confirmPassword && errors.confirmPassword}
                      icon={<LockIcon width={spacing[6]} height={spacing[6]} />}
                    />
                  </Box>
                </Box>
              </ScrollView>
              <Box px="5" py="5">
                {requestError && (
                  <Text
                    mb="5"
                    align="center"
                    color="error"
                    variant={"text-xs-bold"}
                  >
                    {requestError}
                  </Text>
                )}
                {isSuccess && (
                  <Text
                    mb="5"
                    align="center"
                    color="black-200"
                    variant={"text-md-medium"}
                  >
                    Password successfully changed.
                  </Text>
                )}
                <CButton
                  disabled={
                    Object.keys(touched).length > 0 &&
                    (!isValid || isSubmitting)
                  }
                  onPress={handleSubmit}
                >
                  <Text color={colors.white} variant="text-md-semi-bold">
                    Save Changes
                  </Text>
                </CButton>
              </Box>
            </Box>
          )}
        </Formik>
      </SafeScreen>
    </TouchableWithoutFeedback>
  );
}

export default ChangePasswordScreen;
