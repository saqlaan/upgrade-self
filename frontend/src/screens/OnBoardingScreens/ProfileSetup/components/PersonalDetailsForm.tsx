import {
  Box,
  CustomTextInput,
  DateAndTimeSelector,
  Text,
} from "@/components/atoms";
import colors from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { subYears } from "date-fns";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet } from "react-native";
import { FormValues } from "../ProfileSetup";
import GenderBox from "./GenderBox";

function PersonalDetails() {
  const { t } = useTranslation(["profileSetup", "common"]);

  const { errors, handleChange, values, handleBlur, touched } =
    useFormikContext<FormValues>();

  const handleGenderChange = (value: string) => {
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
                label={t("profileSetup:firstname")}
                onChangeText={handleChange("firstname")}
                value={values.firstname}
                textContentType={"name"}
                onBlur={handleBlur("firstname")}
                error={touched.firstname ? errors.firstname : ""}
              />
            </Box>
            <Box flex={1}>
              <CustomTextInput
                label={t("profileSetup:lastname")}
                onChangeText={handleChange("lastname")}
                value={values.lastname}
                textContentType={"name"}
                onBlur={handleBlur("lastname")}
                error={touched.lastname ? errors.lastname : ""}
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
                onPress={() => handleGenderChange("male")}
                style={{ flex: 1 }}
              >
                <GenderBox type="male" value={values.gender} />
              </Pressable>
              <Pressable
                onPress={() => handleGenderChange("female")}
                style={{ flex: 1 }}
              >
                <GenderBox type="female" value={values.gender} />
              </Pressable>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 0,
  },
  genderBox: {
    borderRadius: spacing[2],
  },
  formBox: {
    borderRadius: spacing[2],
    borderWidth: 1,
    borderColor: colors["grey-400"],
  },
});

export default PersonalDetails;
