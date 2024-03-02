import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Button, ButtonProps, useTheme } from "react-native-paper";

type Props = ButtonProps & {
  variant?: "primary" | "secondary" | "default";
  icon: ReactNode;
};

function IconButton({ icon, children, ...props }: Props) {
  const { colors } = useTheme();
  return (
    <View style={styles.IconButtonWrapper}>
      <Button
        style={styles.style}
        contentStyle={styles.contentStyles}
        mode="contained"
        buttonColor={colors.primary}
        {...props}
      >
        {children}
      </Button>
      <View style={styles.IconWrapper}>
        <Pressable onPress={props.onPress}>{icon}</Pressable>
      </View>
    </View>
  );
}

export default IconButton;

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
  IconButtonWrapper: {
    position: "relative",
  },
  IconWrapper: {
    position: "absolute",
    top: 0,
    right: 20,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
