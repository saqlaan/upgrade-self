import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Icon, useTheme } from "react-native-paper";
import { DangerCircle, EnvelopeSolidIcon } from "@/theme/assets/icons";
import colors from "@/theme/colors";
import { variantFamily } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";
import { AppTheme } from "@/types/theme";

interface InputRightIconProps {
  isError: boolean;
  isPassword: boolean;
  onPressSecureIcon: () => void;
  isTextSecured: boolean;
}

const InputRightIcon = ({
  isError,
  isPassword,
  onPressSecureIcon,
  isTextSecured,
  ...props
}: InputRightIconProps) => {
  const { spacing } = useTheme<AppTheme>();

  if (isError)
    return (
      <DangerCircle
        fill={colors.error}
        width={spacing[6]}
        height={spacing[6]}
      />
    );
  else if (isPassword)
    return (
      <Pressable onPress={onPressSecureIcon}>
        {isTextSecured ? (
          <EnvelopeSolidIcon />
        ) : (
          <Icon color="#656565" size={spacing[6]} source={"eye"} />
        )}
      </Pressable>
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
    borderColor: colors["grey-500"],
    borderLeftColor: colors["grey-500"],
    borderRightColor: colors["grey-500"],
    flexDirection: "row",
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

export default InputRightIcon;
