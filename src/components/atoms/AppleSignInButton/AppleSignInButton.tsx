import { CButton } from "@/components/atoms";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import auth from "@react-native-firebase/auth";
import React, { useCallback, useState } from "react";
import { Platform } from "react-native";

type Props = {
  onError?: (error: string) => void;
};

function AppleSignInButton({ onError }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAppleSignIn = useCallback(async () => {
    setIsLoading(true);
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
      const userCredential = await auth().signInWithCredential(appleCredential);
    } else {
      console.log("Error: Identity token not found");
    }
    setIsLoading(false);
  }, []);
  if (Platform.OS === "ios") {
    return (
      <CButton
        variant="default"
        text="Apple Sign In"
        onPress={handleAppleSignIn}
        isLoading={isLoading}
      />
    );
  } else {
    return null;
  }
}

export default AppleSignInButton;
