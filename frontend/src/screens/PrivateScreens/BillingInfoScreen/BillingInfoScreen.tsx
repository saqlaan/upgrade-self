import React, { useCallback, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { ActivityIndicator } from "react-native-paper";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AndroidScreenTopSpace, Box, Text } from "@/components/atoms";
import {
  PaymentCardItem,
  ProfileScreenHeader,
  TransactionBox,
  WebViewModal,
} from "@/components";
import { SafeScreen } from "@/components/template";
import { colors, spacing } from "@/theme";
import { PlusIcon } from "@/theme/assets/icons";
import { usePayment } from "@/hooks";

function BillingInfoScreen({ navigation }: ApplicationScreenProps) {
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const { addPaymentMethod } = usePayment();
  const [paymentUrl, setPaymentUrl] = useState();
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const handleOnCloseModal = useCallback(() => {
    setIsPaymentModalVisible(false);
  }, []);

  const handleOnPressAddPayment = useCallback(async () => {
    setIsPaymentLoading(true);
    const url = await addPaymentMethod();
    if (url) {
      setPaymentUrl(url);
      setIsPaymentModalVisible(true);
    }
    setIsPaymentLoading(false);
  }, [addPaymentMethod, setPaymentUrl]);

  const _renderItem = () => {
    return <PaymentCardItem />;
  };

  return (
    <SafeScreen edges={["top"]}>
      <Box flex={1}>
        <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
        <AndroidScreenTopSpace />
        <ProfileScreenHeader
          title="Billing Info"
          rightComponent={
            isPaymentLoading ? (
              <Box style={styles.loader}>
                <ActivityIndicator size={spacing[6]} />
              </Box>
            ) : (
              <Pressable onPress={handleOnPressAddPayment}>
                <Box style={styles.borderIcon}>
                  <PlusIcon />
                </Box>
              </Pressable>
            )
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
      <WebViewModal
        onClose={handleOnCloseModal}
        visible={isPaymentModalVisible}
        url={paymentUrl || ""}
      />
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
  loader: {},
});
