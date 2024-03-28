import React from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import type { ApplicationScreenProps } from "@/types/navigation";
import { Box, Text } from "@/components/atoms";
import { ProfileScreenHeader, TransactionBox } from "@/components";
import { SafeScreen } from "@/components/template";
import { colors, spacing } from "@/theme";
import { PlusIcon } from "@/theme/assets/icons";

function BillingInfoScreen({ navigation }: ApplicationScreenProps) {
  const _renderItem = () => {
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
  };
  return (
    <SafeScreen edges={["top"]}>
      <Box flex={1}>
        <StatusBar barStyle={"dark-content"} />
        <ProfileScreenHeader
          title="Billing Info"
          rightComponent={
            <Pressable onPress={() => alert(1)}>
              <Box style={styles.borderIcon}>
                <PlusIcon />
              </Box>
            </Pressable>
          }
        />
        <Box mb="6">
          <Carousel
            data={[0, 1, 2]}
            renderItem={_renderItem}
            sliderWidth={Dimensions.get("window").width}
            itemHeight={180}
            itemWidth={Dimensions.get("window").width - spacing[12] * 2}
            removeClippedSubviews={false}
          />
        </Box>
        <Box px="5" mb="4">
          <Text color="black-400" variant="text-lg-bold">
            Transactions
          </Text>
        </Box>
        <ScrollView>
          <Box px="5" flex={1}>
            <TransactionBox />
            <TransactionBox />
            <TransactionBox />
            <TransactionBox />
            <TransactionBox />
            <TransactionBox />
            <TransactionBox />
            <TransactionBox />
            <TransactionBox />
          </Box>
        </ScrollView>
      </Box>
    </SafeScreen>
  );
}

export default BillingInfoScreen;

const styles = StyleSheet.create({
  cardWrapper: {
    height: 180,
    borderRadius: spacing[4],
  },
  borderIcon: {
    borderWidth: 1,
    borderColor: colors["black-50"],
    borderRadius: spacing[2],
    padding: spacing[2],
  },
});
