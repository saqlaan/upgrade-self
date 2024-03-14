import {
  Box,
  CustomTextInput,
  PhoneNumberInput,
  Text,
} from "@/components/atoms";
import colors from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { useFormikContext } from "formik";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { FormValues } from "../ProfileSetupScreen";

function ContactDetails() {
  const { t } = useTranslation(["profileSetup", "common"]);
  const phoneInputRef = useRef();

  const { errors, handleChange, values, handleBlur, touched } =
    useFormikContext<FormValues>();

  useEffect(() => {
    const countryCode = phoneInputRef.current.getCountryCode();
    if (countryCode) {
      handleChange({
        target: {
          name: "phoneNumberCode",
          value: countryCode,
        },
      });
    }
  }, [phoneInputRef.current, values.phone, touched]);

  return (
    <>
      <Box px="5" py="5">
        <Text variant={"display-xs-bold"} mb={"2"}>
          {t("profileSetup:title1")}
        </Text>
        <Text color={"black-300"} variant={"text-md-medium"} mb={"2"}>
          {t("profileSetup:subtitle1")}
        </Text>
      </Box>
      <Box px="5">
        <Box py="4" px="2" bgColor="grey-100" style={styles.formBox}>
          <Box>
            <CustomTextInput
              label={t("profileSetup:address1")}
              onChangeText={handleChange("address1")}
              value={values.address1}
              textContentType={"streetAddressLine1"}
              onBlur={handleBlur("address1")}
              error={touched.address1 ? errors.address1 : ""}
            />
          </Box>
          <Box mt="2">
            <CustomTextInput
              label={t("profileSetup:address2")}
              onChangeText={handleChange("address2")}
              value={values.address2}
              textContentType={"streetAddressLine2"}
              onBlur={handleBlur("address2")}
              error={touched.address2 ? errors.address2 : ""}
            />
          </Box>
          <Box mt="2">
            <CustomTextInput
              label={t("profileSetup:city")}
              onChangeText={handleChange("city")}
              value={values.city}
              textContentType={"addressCity"}
              onBlur={handleBlur("city")}
              error={touched.city ? errors.city : ""}
            />
          </Box>
          <Box mt="2">
            <CustomTextInput
              label={t("profileSetup:state")}
              onChangeText={handleChange("state")}
              value={values.state}
              textContentType={"addressState"}
              onBlur={handleBlur("state")}
              error={touched.state ? errors.state : ""}
            />
          </Box>
          <Box mt="2">
            <CustomTextInput
              label={t("profileSetup:zipcode")}
              onChangeText={handleChange("zipcode")}
              value={values.zipcode}
              textContentType={"postalCode"}
              keyboardType="number-pad"
              onBlur={handleBlur("zipcode")}
              error={touched.zipcode ? errors.zipcode : ""}
            />
          </Box>
          <Box mt="2">
            <PhoneNumberInput
              label={t("profileSetup:phone")}
              onChangePhoneNumber={handleChange("phone")}
              error={touched.phone ? errors.phone : ""}
              value={values.phone}
              inputRef={phoneInputRef}
              onBlur={handleBlur("phone")}
            />
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

export default ContactDetails;
