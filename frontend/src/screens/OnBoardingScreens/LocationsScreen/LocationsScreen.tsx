import { Picker } from "@react-native-picker/picker";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { BackButton, Box, CButton, Text } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import { updateUser } from "@/services/firebase";
import { fetchAllCentersData } from "@/services/firebaseApp/centers";
import { useUserStore } from "@/store/user.store";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AppTheme } from "@/types/theme";

function Locations({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme<AppTheme>();
  const { t } = useTranslation(["locations", "common"]);
  const { user } = useUserStore();
  const [selectedLocation, setSelectedLocation] = useState<{
    centerId: string;
    countryCode: string;
  } | null>(null);

  useEffect(() => {
    if (user?.centers && user.centers.length > 0)
      setSelectedLocation(user?.centers[0]);
  }, [user]);

  const { data: locations } = useQuery({
    queryKey: ["repoData"],
    queryFn: fetchAllCentersData,
  });

  const { mutateAsync: updateLocationsAsync, isPending } = useMutation({
    mutationFn: updateUser,
  });

  const handlePickerChange = useCallback(
    (centerId: string, index: number) => {
      if (locations && locations.length > 0) {
        const selection = locations[index - 1];
        if (selection)
          setSelectedLocation({
            centerId: selection.id,
            countryCode: selection.country.code,
          });
        else setSelectedLocation(null);
      }
    },
    [locations],
  );

  const _submit = useCallback(async () => {
    try {
      updateLocationsAsync({
        centers: [selectedLocation],
      });
      navigation.navigate("ProfileSetupScreen");
    } catch (e) {
      console.log(e);
    }
  }, [navigation, selectedLocation, updateLocationsAsync]);

  return (
    <SafeScreen>
      {navigation.canGoBack() && (
        <Box px="5" pt="5" row>
          <BackButton color={colors.primary} />
        </Box>
      )}
      <Box px="5" py="5">
        <Text variant={"display-xs-bold"} mb={"2"}>
          {t("locations:title")}
        </Text>
        <Text color={"black-300"} variant={"text-md-medium"} mb={"2"}>
          {t("locations:subtitle")}
        </Text>
      </Box>
      <Box style={styles.container}>
        <Picker
          selectedValue={selectedLocation?.centerId}
          onValueChange={handlePickerChange}
          itemStyle={{ fontSize: 16, fontFamily: "Manrope-SemiBold" }}
          hitSlop={true}
        >
          <Picker.Item label={t("locations:selectLabel")} value="" />
          {locations?.map((location) => (
            <Picker.Item
              key={location.id}
              label={`${location.display_name}, ${location.country.code}`}
              value={location.id}
            />
          ))}
        </Picker>
      </Box>

      <Box px="5" py="5">
        <CButton
          loading={isPending}
          onPress={_submit}
          disabled={selectedLocation === null}
        >
          <Text color={"white"} variant="text-md-semi-bold">
            {t("common:appName.next")}
          </Text>
        </CButton>
      </Box>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
});

export default Locations;
