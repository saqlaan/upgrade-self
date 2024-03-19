import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import PaymentCardItem from "./components/PaymentCardItem";
import BottomPaymentCardItem from "./components/BottomSheetPaymentCardItem";
import PaymentBottomSheetModal from "./components/PaymentBottomSheetModal";
import data from "./data.json";
import { BackButton, Box, CButton, Text } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import { AddSquareRoundedIcon } from "@/theme/assets/icons";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AppTheme } from "@/types/theme";

function PaymentScreen({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme<AppTheme>();
  const { t } = useTranslation(["locations", "common", "payment"]);
  const [selectedCard, setSelectedCard] = useState({
    cardNumber: data.cards[0].card_number,
  });
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCardSelection = useCallback((item) => {
    setSelectedCard(item);
    bottomSheetModalRef.current?.close();
  }, []);

  const handleAddNewPaymentMethod = () => {
    alert("Add new payment");
  };
  return (
    <SafeScreen>
      {navigation.canGoBack() && (
        <Box px="5" mt="5" row>
          <BackButton color={colors.primary} />
          <Box mt="1" style={styles.titleCenter}>
            <Text variant="text-xl-bold">{t("payment:title")}</Text>
          </Box>
        </Box>
      )}
      <Box mt="5" style={styles.container}>
        <PaymentCardItem
          cardNumber={selectedCard.cardNumber}
          onPress={() => handlePresentModalPress()}
        />
        <Box mt="6">
          <Pressable onPress={handleAddNewPaymentMethod}>
            <Box row alignItems={"center"} justifyContent={"center"} gap="2">
              <AddSquareRoundedIcon />
              <Text variant={"text-md-semi-bold"}>
                {t("payment:addNewPayment")}
              </Text>
            </Box>
          </Pressable>
        </Box>
      </Box>

      <Box px="5" py="5">
        <Text align="center" variant={"text-md-medium"} mb="5">
          {t("payment:note")}
        </Text>
        <CButton onPress={() => null}>
          <Text color={"white"} variant="text-md-semi-bold">
            {t("payment:buttonText")}
          </Text>
        </CButton>
      </Box>
      <PaymentBottomSheetModal bottomSheetRef={bottomSheetModalRef}>
        <Box px="5">
          {data.cards.map(({ card_number, id }) => (
            <BottomPaymentCardItem
              key={id}
              onPress={handleCardSelection}
              cardNumber={card_number}
              selectedCard={selectedCard}
            />
          ))}
        </Box>
      </PaymentBottomSheetModal>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  titleCenter: {
    position: "absolute",
    alignItems: "center",
    left: 0,
    right: 0,
    justifyContent: "center",
  },
});

export default PaymentScreen;
