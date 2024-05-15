import React, { useEffect } from "react";
import { Image, Pressable, StatusBar } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Box, Text } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import type { ApplicationScreenProps } from "@/types/navigation";
import { Images } from "@/theme/assets/images";
import { getBrainUpgradeUser } from "@/services/firebaseApp/brainUpgrade";
import { colors } from "@/theme";
import { isAndroid } from "@/utils/functions";

function Appointment({ navigation }: ApplicationScreenProps) {
  const cellHealthAnalysisConnected = false;
  const [brainUpgradeConnected, setBrainUpgradeConnected] = React.useState<
    boolean | null
  >(null);
  useEffect(() => {
    getBrainUpgradeUser()
      .then((user) => {
        if (user) {
          setBrainUpgradeConnected(true);
        } else {
          setBrainUpgradeConnected(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setBrainUpgradeConnected(false);
      });
  }, []); // TODO: fetch this whenever user navigates to this screen
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      if (isAndroid) StatusBar.setBackgroundColor(colors["grey-400"]);
    }, [])
  );
  return (
    <SafeScreen>
      <Box bgColor="grey-400" flex={1}>
        <Box justifyContent="start" py="4" px="5" gap="2">
          <Text variant="text-xl-bold">Stats</Text>
          <Text variant="text-lg-regular">
            Select the type of equipment to check the statistical insights
          </Text>
        </Box>
        <Box
          flex={1}
          justifyContent="start"
          py="6"
          px="4"
          gap="4"
          radius="4"
          bgColor="white"
        >
          <Pressable
            disabled={brainUpgradeConnected !== true}
            onPress={() => {
              navigation.navigate("BrainUpgradeScreen");
            }}
          >
            <Box row bgColor="grey-400" py="6" px="4" radius="4">
              <Box>
                <Text variant="text-xl-bold">Brain Upgrade</Text>
                {brainUpgradeConnected && (
                  <Text color="success">Connected</Text>
                )}
                {brainUpgradeConnected === false && (
                  <Text color="info">(No BrainUpgrade profile found)</Text>
                )}
                {brainUpgradeConnected === null && <Text>Loading...</Text>}
              </Box>
              <Box
                flex={1}
                style={{
                  maxHeight: 200,
                }}
                alignItems="flex-end"
              >
                <Image
                  source={Images.BrainUpgrade}
                  style={{
                    maxHeight: 250,
                    maxWidth: 150,
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Box>
          </Pressable>
          <Pressable
            disabled={cellHealthAnalysisConnected !== true}
            onPress={() => {
              navigation.navigate("CellHealthAnalysisScreen");
            }}
          >
            <Box row bgColor="grey-400" py="6" px="4" radius="4">
              <Box>
                <Text variant="text-xl-bold">Cell Health Analysis</Text>
                <Text>Coming soon</Text>
              </Box>
              <Box
                style={{
                  maxHeight: 210,
                }}
              >
                <Image
                  source={Images.CellHealthAnalysis}
                  style={{
                    maxHeight: 250,
                    maxWidth: 150,
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Box>
          </Pressable>
        </Box>
      </Box>
    </SafeScreen>
  );
}

export default Appointment;
