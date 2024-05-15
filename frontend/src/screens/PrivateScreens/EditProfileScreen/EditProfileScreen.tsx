import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Formik, FormikHelpers, FormikValues } from "formik";
import {
  Keyboard,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "react-native-paper";
import _ from "lodash";
import { AppTheme } from "@/types/theme";
import type { ApplicationScreenProps } from "@/types/navigation";
import { updateUser } from "@/services/firebase";
import { signupDetailsSchema } from "@/schema";
import { AndroidScreenTopSpace, Box, CButton, Text } from "@/components/atoms";
import { useUserStore } from "@/store/userStore";
import {
  ContactDetailsForm,
  PersonalDetailsForm,
  ProfileScreenHeader,
} from "@/components";
import { ProfileFormValuesType } from "@/types";
import { SafeScreen } from "@/components/template";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";

function EditProfileScreen({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme<AppTheme>();
  const keyboardHeight = useKeyboardHeight();
  const { user } = useUserStore();
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
    { setFieldError, setSubmitting }: FormikHelpers<ProfileFormValuesType>
  ) => {
    if (values.phone.length !== 12) {
      setSubmitting(false);
      setTimeout(() => {
        setFieldError("phone", "Invalid phone number");
      }, 100);
      return null;
    }

    // TODO: Review
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeScreen edges={["top"]}>
        <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
        <Formik<ProfileFormValuesType>
          initialValues={initialValues}
          validationSchema={signupDetailsSchema}
          onSubmit={_onSubmit}
          alignItems="center"
        >
          {({ handleSubmit, isSubmitting, isValid, touched }) => (
            <Box flex={1}>
              <Box flex={1}>
                <AndroidScreenTopSpace />
                <ProfileScreenHeader title="Edit profile" />
                <ScrollView
                  contentContainerStyle={{ paddingBottom: keyboardHeight }}
                >
                  <Box flex={1}>
                    <PersonalDetailsForm isUpdating={true} />
                    <ContactDetailsForm isUpdating={true} />
                  </Box>
                </ScrollView>
              </Box>
              <Box px="5" py="5">
                <CButton
                  disabled={
                    Object.keys(touched).length > 0 &&
                    (!isValid || isSubmitting)
                  }
                  onPress={handleSubmit}
                  loading={isPending}
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

export default EditProfileScreen;
