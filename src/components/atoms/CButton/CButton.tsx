import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type Props = TouchableOpacityProps & {
  isLoading?: boolean;
  text: string;
  variant?: "primary" | "secondary" | "default";
};

function CButton({ isLoading, text, variant = "primary", ...props }: Props) {
  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return styles.primaryButton;
      default:
        return styles.defaultButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "primary":
        return styles.primaryText;
      default:
        return styles.defaultText;
    }
  };

  return (
    <TouchableOpacity style={[styles.button, getButtonStyle()]} {...props}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[getTextStyle()]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

export default CButton;

const styles = StyleSheet.create({
  button: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#fb5b5a",
  },
  defaultButton: {
    backgroundColor: "#eee",
  },
  primaryText: {
    color: "white",
  },
  defaultText: {
    color: "#333",
  },
});
