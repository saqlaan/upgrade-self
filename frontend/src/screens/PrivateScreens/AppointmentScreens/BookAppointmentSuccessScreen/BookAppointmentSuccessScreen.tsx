import React from "react";
import { ImageBackground, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box, CButton, Text } from "@/components/atoms";
import { LikeIcon } from "@/theme/assets/icons";
import { Images } from "@/theme/assets/images";
import { spacing } from "@/theme/spacing";
import type { ApplicationScreenProps } from "@/types/navigation";

function BookAppointmentSuccessScreen({ navigation }: ApplicationScreenProps) {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <ImageBackground source={Images.primaryBgLines} style={{ flex: 1 }}>
      <StatusBar barStyle={"light-content"} />
      <View
        style={[
          styles.container,
          {
            paddingTop: top,
            paddingBottom: bottom,
          },
        ]}
      >
        <Box flex={1} px="8" pt="12"></Box>
        <Box style={styles.iconWrapper} bgColor="white">
          <LikeIcon />
        </Box>
        <Box px="5" py="5">
          <Text
            mb={"6"}
            color="white"
            align="center"
            variant={"display-xs-bold"}
          >
            Session successfully booked!
          </Text>
          <Text color="white" align="center" variant={"text-md-medium"} mb="5">
            You will receive an email containing all the details related to your
            booked session
          </Text>
          <CButton
            onPress={() => navigation.navigate("MyAppointmentsScreen")}
            variant={"default"}
          >
            <Text color={"black-900"} variant="text-md-semi-bold">
              Go to my appointments
            </Text>
          </CButton>
        </Box>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    width: spacing["10"],
    height: spacing["10"],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: spacing["10"],
    position: "absolute",
  },
});

export default BookAppointmentSuccessScreen;
