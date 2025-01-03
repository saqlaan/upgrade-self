import React from "react";
import { subYears } from "date-fns";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet } from "react-native";
import { FormValues, Gender } from "../ProfileSetupScreen";
import GenderBox from "./GenderBox";
import { spacing } from "@/theme/spacing";
import colors from "@/theme/colors";
import {
  Box,
  CustomTextInput,
  DateAndTimeSelector,
  Text,
} from "@/components/atoms";

function PersonalDetails() {
  const { t } = useTranslation(["profileSetup", "common"]);

  const { errors, handleChange, values, handleBlur, touched } =
    useFormikContext<FormValues>();

  const handleGenderChange = (value: Gender) => {
    handleChange({
      target: {
        name: "gender",
        value,
      },
    });
  };

  return (
    <>
      <Box px="5" py="5">
        <Text variant={"display-xs-bold"} mb={"2"}>
          {t("profileSetup:title")}
        </Text>
        <Text color={"black-300"} variant={"text-md-medium"} mb={"2"}>
          {t("profileSetup:subtitle")}
        </Text>
      </Box>
      <Box px="5">
        <Box py="4" px="2" bgColor="grey-100" style={styles.formBox}>
          <Box row gap="4">
            <Box flex={1}>
              <CustomTextInput
                label={t("profileSetup:firstName")}
                onChangeText={handleChange("firstName")}
                value={values.firstName}
                textContentType={"name"}
                onBlur={handleBlur("firstName")}
                error={touched.firstName ? errors.firstName : ""}
              />
            </Box>
            <Box flex={1}>
              <CustomTextInput
                label={t("profileSetup:lastName")}
                onChangeText={handleChange("lastName")}
                value={values.lastName}
                textContentType={"name"}
                onBlur={handleBlur("lastName")}
                error={touched.lastName ? errors.lastName : ""}
              />
            </Box>
          </Box>
          <Box mt="2">
            <DateAndTimeSelector
              label={t("profileSetup:dob")}
              onChangeText={handleChange("dob")}
              value={values.dob}
              onBlur={handleBlur("dob")}
              error={touched.dob ? errors.dob : ""}
              maximumDate={subYears(Date.now(), 16)}
              minimumDate={subYears(Date.now(), 100)}
            />
          </Box>
          <Box mt="2">
            <Text color={"black-300"} variant={"text-sm-medium"}>
              {t("profileSetup:gender")}
            </Text>
            <Box row gap="2" pt="2">
              <Pressable
                onPress={() => handleGenderChange(Gender.Male)}
                style={{ flex: 1 }}
              >
                <GenderBox type={Gender.Male} value={values.gender} />
              </Pressable>
              <Pressable
                onPress={() => handleGenderChange(Gender.Female)}
                style={{ flex: 1 }}
              >
                <GenderBox type={Gender.Female} value={values.gender} />
              </Pressable>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  formBox: {
    borderRadius: spacing[2],
    borderWidth: 1,
    borderColor: colors["grey-400"],
  },
});

export default PersonalDetails;
