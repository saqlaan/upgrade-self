import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { BackButton, Box, CButton, Text } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import { updateUser } from "@/services/firebase";
import { fetchAllCentersData } from "@/services/firebaseApp/centers";
import { useUserStore } from "@/store/user.store";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AppTheme } from "@/types/theme";
import { useDynamicBottomSheet } from "@/hooks";
import { DynamicBottomSheet } from "@/components";
import { colors } from "@/theme";
import { CenterType } from "@/types";

function Locations({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme<AppTheme>();
  const { t } = useTranslation(["locations", "common"]);
  const { user } = useUserStore();
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } =
    useDynamicBottomSheet();
  const [selectedLocation, setSelectedLocation] = useState<{
    centerId: string;
    countryCode: string;
    name: string;
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

  const handleOnChange = useCallback((center: CenterType) => {
    setSelectedLocation({
      centerId: center.id,
      countryCode: center.country.code,
      name: center.name,
    });
    closeBottomSheet();
  }, []);

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

  const renderItem = useCallback(
    ({ item: center }: { item: CenterType }) => {
      return (
        <TouchableOpacity onPress={() => handleOnChange(center)}>
          <Box px="4" key={center.id} mb="5">
            <Text
              color={
                selectedLocation?.centerId === center.id
                  ? "secondary"
                  : "black-600"
              }
            >
              {center.name}
            </Text>
          </Box>
        </TouchableOpacity>
      );
    },
    [handleOnChange, selectedLocation?.centerId],
  );

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
        <TouchableOpacity onPress={openBottomSheet}>
          <Box gap="2" radius="3" px="4" py="4" row style={styles.inputWrapper}>
            <Text color="black-700" variant="text-sm-medium">
              {selectedLocation?.name || "Select location"}
            </Text>
          </Box>
        </TouchableOpacity>

        <DynamicBottomSheet bottomSheetModalRef={bottomSheetRef}>
          <Box mt="6">
            <FlatList
              style={{ height: 300 }}
              data={locations}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </Box>
        </DynamicBottomSheet>
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
    padding: 20,
    paddingTop: 0,
    flex: 1,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: colors["primary-300"],
    height: 55,
  },
});

export default Locations;
