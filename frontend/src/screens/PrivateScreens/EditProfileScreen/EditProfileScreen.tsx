import React from "react";
import { useKeyboard } from "@react-native-community/hooks";
import { useMutation } from "@tanstack/react-query";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import _ from "lodash";

import { AppTheme } from "@/types/theme";
import type { ApplicationScreenProps } from "@/types/navigation";
import { updateUser } from "@/services/firebase";
import { signupDetailsSchema } from "@/schema";
import { SafeScreen } from "@/components/template";
import { BackButton, Box, CButton, Text } from "@/components/atoms";
import { UseUserStore } from "@/store/user.store";
import { ContactDetailsForm, PersonalDetailsForm } from "@/components";
import { ProfileFormValuesType } from "@/types";

function EditProfileScreen({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme<AppTheme>();
  const { keyboardHeight } = useKeyboard();
  const { user } = UseUserStore();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateUser,
  });
  const initialValues = {
    ...user,
    phone: `+${user?.phone?.code}${user?.phone?.number}`,
    code: "",
  };

  const _onSubmit = async (
    values: FormikValues,
    { setFieldError, setSubmitting }: FormikHelpers<ProfileFormValuesType>,
  ) => {
    if (values.phone.length !== 12) {
      setSubmitting(false);
      setTimeout(() => {
        setFieldError("phone", "Invalid phone number");
      }, 100);
      return null;
    }

    const phoneNumber = values.phone.split(`+${values.phoneNumberCode}`)[1];
    try {
      mutateAsync({
        ..._.pick(values, [
          "firstName",
          "lastName",
          "dob",
          "gender",
          "address1",
          "address2",
          "city",
          "state",
          "zipcode",
        ]),
        phone: {
          number: phoneNumber,
          code: values.phoneNumberCode,
        },
      });
    } catch {
      console.error(error);
    }
  };

  return (
    <SafeScreen>
      <Box px="5" row alignItems="center" justifyContent="space-between">
        <BackButton color={colors.primary} />
        <Box style={styles.title}>
          <Text variant="text-xl-bold">Edit profile</Text>
        </Box>
      </Box>
      <Formik<ProfileFormValuesType>
        initialValues={initialValues}
        validationSchema={signupDetailsSchema}
        onSubmit={_onSubmit}
      >
        {({ handleSubmit, isSubmitting, isValid, touched }) => (
          <>
            <ScrollView>
              <Box flex={1} style={{ paddingBottom: keyboardHeight }}>
                <PersonalDetailsForm isUpdating={true} />
                <ContactDetailsForm isUpdating={true} />
              </Box>
            </ScrollView>
            <Box px="5" py="5">
              <CButton
                disabled={
                  Object.keys(touched).length > 0 && (!isValid || isSubmitting)
                }
                onPress={handleSubmit}
                loading={isPending}
              >
                <Text color={colors.white} variant="text-md-semi-bold">
                  Save Changes
                </Text>
              </CButton>
            </Box>
          </>
        )}
      </Formik>
    </SafeScreen>
  );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
