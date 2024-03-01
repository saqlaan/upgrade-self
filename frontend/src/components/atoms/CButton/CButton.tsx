import { StyleSheet } from "react-native";
import { Button, ButtonProps, useTheme } from "react-native-paper";

type Props = ButtonProps & {
  variant?: "primary" | "secondary" | "default";
};

function CButton({ children, ...props }: Props) {
  const { colors } = useTheme();

  return (
    <Button
      style={styles.style}
      contentStyle={styles.contentStyles}
      mode="contained"
      buttonColor={colors.primary}
      {...props}
    >
      {children}
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
});
