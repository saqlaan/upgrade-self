import React, { useEffect } from "react";
import { useKeyboard } from "@react-native-community/hooks";
import { useMutation } from "@tanstack/react-query";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import _ from "lodash";
import { AppTheme } from "@/types/theme";
import type { ApplicationScreenProps } from "@/types/navigation";
import { updateUser } from "@/services/firebase";
import { signupDetailsSchema } from "@/schema";
import { SafeScreen } from "@/components/template";
import { BackButton, Box, CButton, Text } from "@/components/atoms";
import { ContactDetailsForm, PersonalDetailsForm } from "@/components";
import { ProfileFormValuesType, Gender } from "@/types";
import { useUserStore } from "@/store/user.store";

const initialValues: ProfileFormValuesType = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: Gender.NotSpecified,
  address1: "",
  address2: "",
  city: "",
  state: "",
  zipcode: "",
  phone: "+1",
  phoneNumberCode: "",
};

function ProfileSetup({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme<AppTheme>();
  const { t } = useTranslation(["common"]);
  const { keyboardHeight } = useKeyboard();
  const { user } = useUserStore();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateUser,
  });

  useEffect(() => {
    initialValues;
  }, []);

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
        onBoardingStep: 1,
        ..._.omit(values, ["phoneNumberCode"]),
        phone: {
          number: phoneNumber,
          code: values.phoneNumberCode,
        },
      });
      navigation.navigate("WelcomeScreen");
    } catch {
      console.error(error);
    }
  };

  const handleGetInitialValues = () => {
    if (user?.firstName) {
      return {
        ...initialValues,
        ...user,
        phone: `+${user.phone?.code}${user.phone?.number}`,
      };
    }
    return initialValues;
  };

  return (
    <SafeScreen>
      {navigation.canGoBack() && (
        <Box px="5" pt="5" row>
          <BackButton color={colors.primary} />
        </Box>
      )}
      <Formik<ProfileFormValuesType>
        initialValues={handleGetInitialValues()}
        validationSchema={signupDetailsSchema}
        onSubmit={_onSubmit}
      >
        {({ handleSubmit, isSubmitting, isValid, touched }) => (
          <>
            <ScrollView>
              <Box flex={1} style={{ paddingBottom: keyboardHeight }}>
                <PersonalDetailsForm />
                <ContactDetailsForm />
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
                  {t("common:appName.next")}
                </Text>
              </CButton>
            </Box>
          </>
        )}
      </Formik>
    </SafeScreen>
  );
}

export default ProfileSetup;
