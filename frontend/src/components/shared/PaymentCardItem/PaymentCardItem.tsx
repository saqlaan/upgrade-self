import React from "react";
import { StyleSheet } from "react-native";
import { Box, Text } from "@/components/atoms";
import { spacing } from "@/theme";

function PaymentCardItem() {
  return (
    <Box
      style={styles.cardWrapper}
      px="4"
      py="4"
      bgColor={["#006F5A"]}
      justifyContent="space-between"
    >
      <Box row justifyContent="space-between">
        <Text variant="text-md-bold" color="white">
          Visa
        </Text>
        <Text variant="text-md-bold" color="white">
          Remove Card
        </Text>
      </Box>
      <Box justifyContent="space-between">
        <Box>
          <Text variant="text-md-bold" mb="1" color="white">
            Card number
          </Text>
          <Box row justifyContent="space-between" alignItems="flex-end">
            <Text variant="text-xs-medium" color="white">
              **** 2310
            </Text>
            <Text variant="text-md-bold" color="white">
              Make default
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PaymentCardItem;

const styles = StyleSheet.create({
  cardWrapper: {
    height: 180,
    borderRadius: spacing[4],
  },
});
