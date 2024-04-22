import React, { useCallback, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Box, Text } from "@/components/atoms";
import { ArrowDownIcon, MapPointIcon } from "@/theme/assets/icons";
import { colors, spacing } from "@/theme";
import { useUserStore } from "@/store/user.store";
import { fetchAllCentersData } from "@/services/firebaseApp/centers";
import { DynamicBottomSheet } from "@/components";
import { useDynamicBottomSheet } from "@/hooks";
import { updateUser } from "@/services/firebase";
import { useCenter } from "@/store/center";
import { CenterType } from "@/types";

const CenterSelector = () => {
  const { user } = useUserStore();
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } =
    useDynamicBottomSheet();
  const { setCenter, center: selectedCenter } = useCenter();
  const { mutateAsync: updateUserCenterAsync } = useMutation({
    mutationFn: updateUser,
  });

  const { data: centers } = useQuery({
    queryKey: ["allCenter"],
    queryFn: fetchAllCentersData,
  });

  const loadCenterOnStart = async () => {
    if (!selectedCenter) {
      if (user?.centers.length && user.centers.length > 0) {
        setCenter(user.centers[0]);
      }
    }
  };

  useEffect(() => {
    loadCenterOnStart();
  }, []);

  const handleOnChange = useCallback(
    (center: CenterType) => {
      if (center) {
        const updatedCenter = {
          centerId: center.id,
          countryCode: center.country.code,
          name: center.name,
        };
        updateUserCenterAsync({
          centers: [updatedCenter],
        });
        setCenter(updatedCenter);
      }
      closeBottomSheet();
    },
    [closeBottomSheet, setCenter, updateUserCenterAsync],
  );

  const renderItem = useCallback(
    ({ item: center }: { item: CenterType }) => {
      return (
        <TouchableOpacity onPress={() => handleOnChange(center)}>
          <Box px="4" key={center.id} mb="5">
            <Text
              color={
                selectedCenter?.centerId === center.id
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
    [handleOnChange, selectedCenter?.centerId],
  );

  return (
    <>
      <TouchableOpacity onPress={openBottomSheet}>
        <Box row alignItems="center" gap="2">
          <MapPointIcon
            fill={colors.secondary}
            width={spacing[5]}
            height={spacing[5]}
          />
          <Text variant="text-sm-bold" color="secondary">
            {selectedCenter?.name}
          </Text>
          <ArrowDownIcon fill={colors.secondary} />
        </Box>
      </TouchableOpacity>
      <DynamicBottomSheet bottomSheetModalRef={bottomSheetRef}>
        <Box mt="6">
          <FlatList
            style={{ height: 300 }}
            data={centers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </Box>
      </DynamicBottomSheet>
    </>
  );
};

export default CenterSelector;
