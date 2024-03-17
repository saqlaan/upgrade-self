import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { Box, Text } from "@/components/atoms";
import { ArrowDownIcon } from "@/theme/assets/icons";
import { Images } from "@/theme/assets/images";
import colors from "@/theme/colors";

const PaymentCardItem = ({
  label = "Payment",
  cardNumber,
  onPress,
}: {
  label: string;
  onPress: () => void;
  cardNumber: string;
}) => {
  return (
    <Pressable onPress={onPress}>
      <Box>
        <Text variant="text-sm-medium" color={"black-300"}>
          {label}
        </Text>
        <Box
          gap="3"
          mt="2"
          alignItems="center"
          px="4"
          style={styles.itemWrapper}
        >
          <Box>
            <Image source={Images.visa} />
          </Box>
          <Box flex={1}>
            <Text color="black-500" variant={"text-md-semi-bold"}>
              Visa ending in {cardNumber}
            </Text>
          </Box>
          <ArrowDownIcon />
        </Box>
      </Box>
    </Pressable>
  );
};

export default PaymentCardItem;

const styles = StyleSheet.create({
  itemWrapper: {
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors["grey-500"],
    flexDirection: "row",
    height: 52,
  },
});
