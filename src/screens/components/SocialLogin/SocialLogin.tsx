import { AppleSignIn, GoogleSignInButton, Spacer } from "@/components/atoms";
import React from "react";
import { Divider } from "react-native-paper";

function SocialLogin() {
  return (
    <>
      <Spacer marginTop={20} />
      <Divider />
      <Spacer marginTop={20} />
      <GoogleSignInButton />
      <Spacer marginTop={20} />
      <AppleSignIn />
      <Spacer marginTop={30} />
    </>
  );
}

export default SocialLogin;
