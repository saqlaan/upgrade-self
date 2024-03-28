import React, { ReactNode, createContext, useContext, useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import Snackbar from "react-native-snackbar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { useMutation } from "@tanstack/react-query";
import { colors, spacing } from "@/theme";
import { addGuestPaymentAsync } from "@/services/firebaseApp/centers";
import { BackButton, Box } from "@/components/atoms";
import { getUser } from "@/services/firebase";
import { getUserGuests } from "@/services/firebase/collections/guest";

type PaymentContextType = {
  addPaymentMethod: () => void;
};

const PaymentContext = createContext<PaymentContextType | null>(null);

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

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [webUrl, setWebUrl] = useState("");
  const { mutateAsync, isPending } = useMutation({
    mutationFn: addGuestPaymentAsync,
  });

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const addPaymentInfo = (paymentData) => {
    setPaymentInfo(paymentData);
    setIsModalOpen(false); // Close modal after adding payment info
  };

  const handleAddNewPaymentMethod = async () => {
    try {
      const user = await getUser();
      const { centers } = user;
      const { centerId } = centers[0];
      const guestInfo = await getUserGuests();
      if (guestInfo) {
        const { guestAccounts } = guestInfo;
        const guestAccount = guestAccounts.find(
          (guestAccount) => guestAccount.centerId == centerId,
        );
        if (!guestAccount) {
          console.log("Account not availble");
          return;
        }
        const request = await mutateAsync(guestAccount);
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
        setIsModalOpen(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const contextValue = {
    addPaymentMethod: handleAddNewPaymentMethod,
  };

  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
      <WebViewModal
        url={webUrl}
        visible={isModalOpen}
        onClose={handleModalClose}
      />
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};

const styles = StyleSheet.create({
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
