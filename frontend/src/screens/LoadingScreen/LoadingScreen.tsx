import { getUser } from "@/services/firebase";
import { Images } from "@/theme/assets/images";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AppTheme } from "@/types/theme";
import { firebase } from "@react-native-firebase/auth";
import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Startup({ navigation }: ApplicationScreenProps) {
  const { colors, spacing } = useTheme<AppTheme>();
  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    onUserLogin();
  }, []);

  const onUserLogin = async () => {
    const user = await getUser();
    if (user?.onboardingCompleted) {
      navigation.replace("Home");
    } else {
      navigation.replace("Locations");
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
