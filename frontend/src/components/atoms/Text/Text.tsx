import React from "react";
import { Text as BaseComp, useTheme } from "react-native-paper";
import colors from "@/theme/colors";
import { TextVariants } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";
import { AppTheme } from "@/types/theme";

export interface TextProps extends React.ComponentProps<typeof BaseComp> {
  color?: keyof typeof colors;
  variant?: keyof typeof TextVariants;
  align?: "left" | "right" | "center";
  mt?: keyof typeof spacing;
  mb?: keyof typeof spacing;
}

function Text({
  color,
  align,
  variant,
  mt,
  mb,
  style,
  children,
  ...props
}: TextProps) {
  const { colors } = useTheme<AppTheme>();
  const dynamicStyles = [
    color && { color: colors[color] ? colors[color] : color },
    align && { textAlign: align },
    mt && {
      marginTop: spacing[mt],
    },
    mb && {
      marginBottom: spacing[mb],
    },
    style,
  ];
  return (
    <BaseComp variant={variant} style={dynamicStyles} {...props}>
      {children}
    </BaseComp>
  );
}

export default Text;
