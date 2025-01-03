import React, { ReactNode, Ref } from "react";
import { Image, StyleSheet, TextInputProps, View } from "react-native";
import { useTheme } from "react-native-paper";
import PhoneInput from "react-native-phone-input";
import Box from "../Box/Box";
import Spacer from "../Spacer/Spacer";
import Text from "../Text/Text";
import { AppTheme } from "@/types/theme";
import { spacing } from "@/theme/spacing";
import { variantFamily } from "@/theme/fonts";
import colors from "@/theme/colors";
import { AltArrowDownIcon } from "@/theme/assets/icons";

interface CustomTextInputProps extends TextInputProps {
  error?: string;
  label?: string;
  icon?: ReactNode;
  onChangePhoneNumber: (value: any) => void;
  inputRef?: Ref<object>;
}

const PhoneNumberInput: React.FC<CustomTextInputProps> = ({
  inputRef = null,
  placeholder,
  onChangeText,
  inputMode = "text",
  error,
  label,
  icon,
  onChangePhoneNumber,
  ...props
}) => {
  const { colors, spacing } = useTheme<AppTheme>();
  const hasError = error !== undefined && error !== "";

  return (
    <>
      <View>
        {label && (
          <Text color="black-300" variant={"text-sm-medium"}>
            {label}
          </Text>
        )}
        <Spacer marginBottom={spacing[2]} />
      </View>
      <PhoneInput
        ref={inputRef}
        style={{
          flexDirection: "row",
        }}
        onChangePhoneNumber={onChangePhoneNumber}
        initialCountry={"us"}
        textStyle={[
          styles.phoneTextInputStyle,
          hasError
            ? {
                borderColor: colors.error,
                borderLeftColor: colors.error,
                borderRightColor: colors.error,
              }
            : {},
        ]}
        textProps={{
          onBlur: props.onBlur,
          value: props.value,
        }}
        renderFlag={({ imageSource }) => {
          return (
            <Box
              bgColor="grey-300"
              px="4"
              py="4"
              alignItems="center"
              justifyContent="center"
              style={styles.flagContainer}
              row
            >
              <Image
                style={{
                  width: spacing[6],
                  height: spacing[4],
                  borderRadius: 2,
                }}
                source={imageSource}
                resizeMode="cover"
              />
              <AltArrowDownIcon />
            </Box>
          );
        }}
        {...props}
      />
      {hasError && (
        <>
          <Text mt="2" color="error">
            {error}
          </Text>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flagContainer: {
    borderWidth: 1.5,
    borderColor: colors["grey-400"],
    shadowColor: "transparent",
    height: 52,
    borderRadius: 8,
  },
  phoneTextInputStyle: {
    height: 52,
    borderWidth: 1.5,
    borderColor: colors["grey-500"],
    fontSize: 16,
    fontFamily: variantFamily["semi-bold"],
    color: colors["black-400"],
    flex: 1,
    paddingHorizontal: spacing[4],
    borderRadius: spacing[2],
  },
});

export default PhoneNumberInput;
