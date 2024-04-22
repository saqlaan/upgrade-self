import React, { ReactNode, useCallback, useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";
import Spacer from "../Spacer/Spacer";
import InputRightIcon from "./InputRightIcon";
import { AppTheme } from "@/types/theme";
import { spacing } from "@/theme/spacing";
import { TextVariants, variantFamily } from "@/theme/fonts";
import colors from "@/theme/colors";

interface CustomTextInputProps extends TextInputProps {
  error?: string;
  label?: string;
  icon?: ReactNode;
  inputHints?: string[];
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  onChangeText,
  inputMode = "text",
  autoCapitalize = "none",
  onBlur,
  error,
  label,
  icon,
  textContentType,
  inputHints,
  ...props
}) => {
  const { colors, spacing } = useTheme<AppTheme>();
  const [isFocused, setIsFocused] = useState(false);
  const [isTextSecured, setIsTextSecured] = useState(
    textContentType === "password" ? true : false,
  );

  const handleOnFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleOnBlur = useCallback((e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  }, []);

  const toggleSecureText = useCallback(() => {
    setIsTextSecured((value) => !value);
  }, []);

  const hasError = error !== undefined && error !== "";

  return (
    <>
      <View>
        {label && (
          <Text
            style={{ color: colors["black-300"] }}
            variant={TextVariants["text-sm-medium"]}
          >
            {label}
          </Text>
        )}
        <Spacer marginBottom={spacing[2]} />
      </View>
      <View
        style={[
          styles.inputView,
          hasError
            ? {
                borderBlockColor: colors.error,
                borderLeftColor: colors.error,
                borderRightColor: colors.error,
              }
            : {},
        ]}
      >
        {icon}
        <TextInput
          style={[styles.inputText]}
          placeholder={placeholder}
          placeholderTextColor={"#707070"}
          cursorColor={colors.primary}
          onChangeText={onChangeText}
          autoCapitalize={"none"}
          autoCorrect={false}
          onBlur={handleOnBlur}
          onFocus={handleOnFocused}
          secureTextEntry={isTextSecured}
          autoComplete="off"
          {...props}
        />
        <InputRightIcon
          isPassword={textContentType === "password"}
          isTextSecured={isTextSecured}
          onPressSecureIcon={toggleSecureText}
          isError={hasError}
        />
      </View>
      <Spacer marginTop={spacing[2]} />
      {inputHints && !hasError && props.value == "" && (
        <View>
          {inputHints.map((hint, index) => (
            <View key={index} style={styles.hintRow}>
              <Icon
                size={spacing[3]}
                color={colors["black-300"]}
                source={"circle-medium"}
              />
              <Text
                style={{ color: colors["black-300"] }}
                variant={TextVariants["text-sm-regular"]}
              >
                {hint}
              </Text>
            </View>
          ))}
        </View>
      )}
      {hasError && (
        <>
          <Text style={{ color: colors.error }}>{error}</Text>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputView: {
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: spacing[4],
    justifyContent: "center",
    alignItems: "center",
    gap: spacing[4],
    borderWidth: 1.5,
    borderBlockColor: colors["grey-500"],
    borderLeftColor: colors["grey-500"],
    borderRightColor: colors["grey-500"],
    flexDirection: "row",
    height: 52,
  },
  inputText: {
    height: 52,
    fontSize: 16,
    fontFamily: variantFamily["semi-bold"],
    color: colors["black-400"],
    flex: 1,
  },
  hintRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginBottom: spacing[2],
  },
});

export default CustomTextInput;
