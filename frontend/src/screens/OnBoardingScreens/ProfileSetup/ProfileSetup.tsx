import { BackButton, Box, CButton, Text } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import { signupDetailsSchema } from "@/schema";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AppTheme } from "@/types/theme";
import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import ContactDetailsForm from "./components/ContactDetailsForm";
import PersonalDetailsForm from "./components/PersonalDetailsForm";

export interface FormValues {
  firstname: string;
  lastname: string;
  dob: string;
  gender: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
}

const initialValues: FormValues = {
  firstname: "",
  lastname: "",
  dob: "",
  gender: "male",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zipcode: "",
  phone: "",
};

function ProfileSetup({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme<AppTheme>();
  const { t } = useTranslation(["common"]);
  const [isLoading, setIsLoading] = useState(false);

  const _onSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigation.replace("Welcome");
    }, 2000);
  };

  return (
    <SafeScreen>
      {navigation.canGoBack() && (
        <Box px="5" pt="5" row>
          <BackButton color={colors.primary} />
        </Box>
      )}
      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={signupDetailsSchema}
        onSubmit={_onSubmit}
      >
        {({ handleSubmit, isSubmitting, isValid }) => (
          <>
            <ScrollView>
              <Box flex={1}>
                <PersonalDetailsForm />
                <ContactDetailsForm />
              </Box>
            </ScrollView>
            <Box px="5" py="5">
              <>
                <CButton
                  disabled={!isValid || isSubmitting}
                  onPress={handleSubmit}
                  loading={isSubmitting}
                >
                  <Text color={colors.white} variant="text-md-semi-bold">
                    {t("common:appName.next")}
                  </Text>
                </CButton>
              </>
            </Box>
          </>
        )}
      </Formik>
    </SafeScreen>
  );
}

export default ProfileSetup;

const styles = StyleSheet.create({});
