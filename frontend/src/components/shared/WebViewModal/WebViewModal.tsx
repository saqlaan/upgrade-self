import React from "react";
import { Modal, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { spacing } from "@/theme";
import { BackButton, Box } from "@/components/atoms";

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

export default WebViewModal;

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
