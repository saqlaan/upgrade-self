import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Box, Text } from "@/components/atoms";
import { spacing } from "@/theme";
import { GuestPaymentMethod } from "@/services/firebaseApp/guests";

function PaymentCardItem({
  paymentMethod,
  isDefault,
  onRemoveCard,
  onMakeDefault,
}: {
  paymentMethod: GuestPaymentMethod;
  isDefault: boolean;
  onRemoveCard: () => void;
  onMakeDefault: () => void;
}) {
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
          {paymentMethod.card_logo}
        </Text>
        {/* <Pressable
          onPress={() => {
            onRemoveCard();
          }}
        >
          <Text variant="text-md-bold" color="white">
            Remove Card
          </Text>
        </Pressable> */}
      </Box>
      <Box justifyContent="space-between">
        <Box>
          <Text variant="text-md-bold" mb="1" color="white">
            Card info
          </Text>
          <Box row justifyContent="space-between" alignItems="flex-end">
            <Box row gap="4">
              <Text variant="text-xs-medium" color="white">
                **** {paymentMethod.last_four}
              </Text>
              <Text variant="text-xs-medium" color="white">
                Expires: {paymentMethod.expiry_on}
              </Text>
            </Box>
            {/* {isDefault === false && (
              <Pressable
                onPress={() => {
                  onMakeDefault();
                }}
              >
                <Text variant="text-md-bold" color="white">
                  Make default
                </Text>
              </Pressable>
            )} */}
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
