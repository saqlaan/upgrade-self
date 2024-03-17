import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { Icon } from "react-native-paper";
import { Box, Text } from "@/components/atoms";
import { colors, spacing } from "@/theme";
import { Images } from "@/theme/assets/images";

const BottomPaymentCardItem = ({
  cardNumber,
  onPress,
  selectedCard,
}: {
  cardNumber: number;
  onPress?: ({ cardNumber: number }) => void;
  selectedCard?: { cardNumber: string } | null;
}) => {
  const selected = selectedCard?.cardNumber == cardNumber;
  return (
    <Pressable onPress={onPress ? () => onPress({ cardNumber }) : () => null}>
      <Box>
        <Box
          gap="3"
          mt="2"
          alignItems="center"
          px="4"
          bgColor={selected ? "black-100" : "white"}
          style={[styles.itemWrapper2]}
        >
          <Box>
            <Image source={Images.visa} />
          </Box>
          <Box flex={1}>
            <Text
              color={selected ? "white" : "black-500"}
              variant={"text-md-semi-bold"}
            >
              Visa ending in {cardNumber}
            </Text>
          </Box>
          {selected && (
            <Icon color={colors.primary} size={spacing[6]} source={"check"} />
          )}
        </Box>
      </Box>
    </Pressable>
  );
};

export default BottomPaymentCardItem;

const styles = StyleSheet.create({
  itemWrapper2: {
    borderRadius: 8,
    borderColor: colors["grey-500"],
    flexDirection: "row",
    height: 52,
  },
});
