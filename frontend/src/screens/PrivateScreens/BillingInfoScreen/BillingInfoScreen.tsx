import React from "react";
import { ScrollView, StatusBar } from "react-native";
import type { ApplicationScreenProps } from "@/types/navigation";
import { Box, Text } from "@/components/atoms";
import { ProfileScreenHeader, TransactionBox } from "@/components";
import { SafeScreen } from "@/components/template";

function BillingInfoScreen({ navigation }: ApplicationScreenProps) {
  return (
    <SafeScreen edges={["top"]}>
      <Box flex={1}>
        <StatusBar barStyle={"dark-content"} />
        <ProfileScreenHeader title="Billing Info" />
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
