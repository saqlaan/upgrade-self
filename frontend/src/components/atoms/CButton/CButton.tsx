import colors from "@/theme/colors";
import { AppTheme } from "@/types/theme";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Button, ButtonProps, useTheme } from "react-native-paper";
import Text from "../Text/Text";

type Props = Omit<ButtonProps, "children"> & {
  variant?: "primary" | "secondary" | "default";
  text?: string;
  children?: ReactNode;
};

function CButton({ variant = "primary", text, children, ...props }: Props) {
  const { colors } = useTheme<AppTheme>();

  if (variant === "default")
    return (
      <Button
        style={[styles.style, styles.defaultContentStyle]}
        contentStyle={styles.contentStyles}
        mode="outlined"
        buttonColor={colors.white}
        {...props}
      >
        {text ? (
          <Text color={colors["black-900"]} variant="text-md-semi-bold">
            {text}
          </Text>
        ) : (
          children
        )}
      </Button>
    );
  else
    return (
      <Button
        style={styles.style}
        contentStyle={styles.contentStyles}
        mode="contained"
        buttonColor={colors.primary}
        {...props}
      >
        {text ? (
          <Text color={colors.white} variant="text-md-semi-bold">
            {text}
          </Text>
        ) : (
          children
        )}
      </Button>
    );
}

export default CButton;

const styles = StyleSheet.create({
  contentStyles: {
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    position: "relative",
  },
  style: {
    borderRadius: 8,
    position: "relative",
  },
  defaultContentStyle: {
    borderColor: colors["grey-500"],
  },
});
