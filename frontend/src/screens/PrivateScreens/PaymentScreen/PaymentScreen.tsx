import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, StyleSheet } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Snackbar from "react-native-snackbar";
import WebView from "react-native-webview";
import { useBookAppointmentMethods } from "../AppointmentScreens/BookAppointmentScreen/components/hooks/useBookAppointmentMethods";
import BottomPaymentCardItem from "./components/BottomSheetPaymentCardItem";
import PaymentBottomSheetModal from "./components/PaymentBottomSheetModal";
import PaymentCardItem from "./components/PaymentCardItem";
import data from "./data.json";
import { AppTheme } from "@/types/theme";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AddSquareRoundedIcon } from "@/theme/assets/icons";
import { spacing } from "@/theme";
import { addGuestPaymentAsync } from "@/services/firebaseApp/centers";
import { SafeScreen } from "@/components/template";
import { BackButton, Box, CButton, Text } from "@/components/atoms";
import { useCenterStore } from "@/store/centerStore";
import { getGuestAccountByCountry } from "@/utils/functions";

const WebViewModal = ({
  visible,
  onClose,
  url,
}: {
  visible: boolean;
  onClose: () => void;
  url: string;
}) => {
  const { colors } = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <Box
        style={[styles.modalWebview, { marginTop: top, marginBottom: bottom }]}
      >
        <Box py="5" row>
          <BackButton onPress={onClose} color={colors.primary} />
        </Box>
        <WebView
          automaticallyAdjustContentInsets={false}
          source={{ uri: url }}
          style={styles.webView}
        />
      </Box>
    </Modal>
  );
};

function PaymentScreen({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme<AppTheme>();
  const { t } = useTranslation(["locations", "common", "payment"]);
  const { hasPaymentMethod } = useBookAppointmentMethods();
  const [selectedCard, setSelectedCard] = useState({
    cardNumber: data.cards[0].card_number,
  });
  const { center } = useCenterStore();

  const [hasValidPaymentMethod, setHasValidPaymentMethod] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [webUrl, setWebUrl] = useState("");

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: addGuestPaymentAsync,
  });

  const onLoad = async () => {
    const paymentMethod = await hasPaymentMethod();
    setHasValidPaymentMethod(paymentMethod);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCardSelection = useCallback((item) => {
    setSelectedCard(item);
    bottomSheetModalRef.current?.close();
  }, []);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleAddNewPaymentMethod = async () => {
    try {
      const guestAccount = await getGuestAccountByCountry(center?.countryCode);
      if (guestAccount) {
        const request = await mutateAsync({
          centerId: center?.centerId,
          countryCode: center?.countryCode,
          guestId: guestAccount.guestId,
        });
        if (request?.data?.error) {
          Snackbar.show({
            text: "Error",
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: "Something went wrong try later",
              textColor: colors.error,
            },
          });
          return;
        }
        const { hosted_payment_uri: hostedPaymentUri } = request?.data;
        setWebUrl(hostedPaymentUri);
        setModalVisible(true);
      }
    } catch (e) {
      console.log(e);
    }
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
        {hasValidPaymentMethod && (
          <PaymentCardItem
            cardNumber={selectedCard.cardNumber}
            onPress={() => handlePresentModalPress()}
          />
        )}
        <Box mt="6">
          {!isPending ? (
            <Pressable onPress={handleAddNewPaymentMethod}>
              <Box row alignItems={"center"} justifyContent={"center"} gap="2">
                <AddSquareRoundedIcon />
                <Text variant={"text-md-semi-bold"}>
                  {t("payment:addNewPayment")}
                </Text>
              </Box>
            </Pressable>
          ) : (
            <ActivityIndicator color={colors["black-300"]} />
          )}
        </Box>
      </Box>

      <Box px="5" py="5">
        <Text align="center" variant={"text-md-medium"} mb="5">
          {t("payment:note")}
        </Text>
        <CButton
          onPress={() => navigation.navigate("BookAppointmentSuccessScreen")}
        >
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
      <WebViewModal
        url={webUrl}
        visible={modalVisible}
        onClose={handleModalClose}
      />
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
  webView: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  modalWebview: {
    flex: 1,
    paddingHorizontal: spacing[5],
  },
});

export default PaymentScreen;
