import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Icon, useTheme } from "react-native-paper";
import colors from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { AppTheme } from "@/types/theme";

type Props = {
  color?: keyof typeof colors;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

function BackButton({ color = "white", style, onPress }: Props) {
  const { colors } = useTheme<AppTheme>();
  const navigation = useNavigation();
  if (!navigation.canGoBack()) return null;
  return (
    <Pressable
      style={[styles.backButton, style]}
      onPress={onPress ? onPress : () => navigation.goBack()}
    >
      <Icon color={color} source={"chevron-left"} size={spacing[6]} />
    </Pressable>
  );
}

export default BackButton;

const styles = StyleSheet.create({
  backButton: {
    padding: spacing[2],
    borderWidth: 1,
    borderColor: colors["black-50"],
    width: "auto",
    borderRadius: spacing[2],
    zIndex: 9999,
    backgroundColor: "rgba(233, 232, 238, 0.10);",
  },
  style: {
    width: "100%",
    borderRadius: 50,
  },
});
