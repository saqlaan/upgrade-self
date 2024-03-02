import colors from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { AppTheme } from "@/types/theme";
import { Colors } from "@/types/theme/colors";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet } from "react-native";
import { Icon, useTheme } from "react-native-paper";

type Props = {
  color?: Colors;
};

function BackButton({ color = colors.white }: Props) {
  const { colors } = useTheme<AppTheme>();
  const navigation = useNavigation();
  return (
    <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
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
