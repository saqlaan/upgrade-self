import React from "react";
import { useKeyboard } from "@react-native-community/hooks";
import { ScrollView, StatusBar } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppTheme } from "@/types/theme";
import type { ApplicationScreenProps } from "@/types/navigation";
import { Box, Text } from "@/components/atoms";
import { ProfileScreenHeader, TransactionBox } from "@/components";

function BillingInfoScreen({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme<AppTheme>();
  const { keyboardHeight } = useKeyboard();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
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
    </SafeAreaView>
  );
}

export default BillingInfoScreen;
