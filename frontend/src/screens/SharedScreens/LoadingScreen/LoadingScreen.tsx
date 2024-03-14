import { getUser } from "@/services/firebase";
import { Images } from "@/theme/assets/images";
import type { ApplicationScreenProps } from "@/types/navigation";
import { firebase } from "@react-native-firebase/auth";
import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

function Startup({ navigation }: ApplicationScreenProps) {
  useEffect(() => {
    onUserLogin();
  }, []);

  const onUserLogin = async () => {
    const user = await getUser();
    if (user?.onBoardingStep === 0) {
      navigation.replace("LocationsScreen");
    } else if (user?.onBoardingStep === 1) {
      navigation.replace("WelcomeScreen");
    } else {
      navigation.replace("LocationsScreen");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.SplashBg}
        resizeMode={"cover"}
        style={styles.image}
      >
        <ActivityIndicator color="white" />
        <Button title="Logout" onPress={() => firebase.auth().signOut()} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Startup;
