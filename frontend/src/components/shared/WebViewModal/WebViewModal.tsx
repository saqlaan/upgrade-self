import React from "react";
import { Modal, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { spacing } from "@/theme";
import { BackButton, Box } from "@/components/atoms";

const parseUrlParams = (url: string) => {
  var regex = /[?&]([^=#]+)=([^&#]*)/g,
    params = {},
    match;
  while ((match = regex.exec(url))) {
    params[match[1]] = match[2];
  }
  return params;
};

const WebViewModal = ({
  visible,
  onClose,
  url,
  onSuccess,
  onFailure,
}: {
  visible: boolean;
  onClose: () => void;
  url: string;
  onSuccess: (m: string) => void;
  onFailure: (m: string) => void;
}) => {
  const { colors } = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  let webview = null;

  this.handleWebViewNavigationStateChange = (newNavState: object) => {
    const { url: newUrl } = newNavState;

    if (!newUrl || !this) {
      return;
    }

    if (newUrl.includes("google.com")) {
      const urlParams = parseUrlParams(newUrl);

      if (urlParams.success === "0") {
        if (urlParams.message.includes("No%20new%20information")) {
          onFailure("card exists");
        }
        if (
          urlParams.message.includes("The%20issuer%20bank%20has%20declined")
        ) {
          onFailure("card declined");
        }
      } else {
        onSuccess("card added");
      }

      const redirectTo = 'window.location = "' + url + '"';
      this.webview.injectJavaScript(redirectTo);
    }
  };
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
          ref={(ref) => (this.webview = ref)}
          automaticallyAdjustContentInsets={false}
          source={{ uri: url }}
          style={styles.webView}
          onNavigationStateChange={this.handleWebViewNavigationStateChange}
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
