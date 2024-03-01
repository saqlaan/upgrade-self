import { CButton } from "@/components/atoms";
import { Images } from "@/theme/assets/images";
import { TextVariants } from "@/theme/fonts";
import { AppTheme } from "@/types/theme";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import auth from "@react-native-firebase/auth";
import React, { useCallback, useState } from "react";
import { Image, Platform } from "react-native";
import { Text, useTheme } from "react-native-paper";

type Props = {
  onError?: (error: string) => void;
};

function AppleSignInButton({ onError }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { colors } = useTheme<AppTheme>();

  const handleAppleSignIn = useCallback(async () => {
    setIsLoading(true);
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      const { identityToken, nonce } = appleAuthRequestResponse;
      if (identityToken) {
        const appleCredential = auth.AppleAuthProvider.credential(
          identityToken,
          nonce
        );
        const userCredential = await auth().signInWithCredential(
          appleCredential
        );
      } else {
        console.log("Error: Identity token not found");
      }
    } catch (e) {
      setIsLoading(false);
    }
    setIsLoading(false);
  }, []);
  if (Platform.OS === "ios") {
    return (
      <CButton
        buttonColor={colors["grey-300"]}
        icon={({ size, color }) => (
          <Image source={Images.AppleIcon} style={{ width: 24, height: 24 }} />
        )}
        onPress={handleAppleSignIn}
        loading={isLoading}
      >
        <Text variant={TextVariants["text-md-semi-bold"]}>Apple</Text>
      </CButton>
    );
  } else {
    return null;
  }
}

export default AppleSignInButton;
