import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { useState } from "react";
import { Image } from "react-native";
import { Text, useTheme } from "react-native-paper";
import CButton from "../CButton/CButton";

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    "915255267011-d7inuo7udqnbuud0od02asjimin8i392.apps.googleusercontent.com", // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: "", // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: "", // [Android] specifies an account name on the device that should be used
  googleServicePlistPath: "", // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  openIdRealm: "", // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

type Props = {
  onError?: (error: string) => void;
};

function GoogleSignInButton({ onError }: Props) {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <CButton
      buttonColor={colors.inputBackground}
      icon={({ size, color }) => (
        <Image
          source={require("../../../theme/assets/images/google-icon.png")}
          style={{ width: 25, height: 25 }}
        />
      )}
      onPress={handleGoogleSignIn}
      loading={isLoading}
    >
      <Text variant={"bodyMedium"}>Continue with google</Text>
    </CButton>
  );
}

export default GoogleSignInButton;
