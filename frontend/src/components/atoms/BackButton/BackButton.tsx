import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

type Props = {
  title?: string;
};

function BackButton({ title }: Props) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon source="chevron-left" color={colors.secondary} size={45} />
      </Pressable>
      {title && (
        <Text
          style={{ color: colors.secondary, fontWeight: "500" }}
          variant={"headlineSmall"}
        >
          Forgot password
        </Text>
      )}
    </View>
  );
}

export default BackButton;

const styles = StyleSheet.create({
  contentStyles: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    width: "100%",
  },
  style: {
    width: "100%",
    borderRadius: 50,
  },
});
