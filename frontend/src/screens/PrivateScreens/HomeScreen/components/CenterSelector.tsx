import React, { useCallback, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Box, Text } from "@/components/atoms";
import { ArrowDownIcon, MapPointIcon } from "@/theme/assets/icons";
import { colors, spacing } from "@/theme";
import { useUserStore } from "@/store/user.store";
import { fetchAllCentersData } from "@/services/firebaseApp/centers";
import { DynamicBottomSheet } from "@/components";
import { useDynamicBottomSheet } from "@/hooks";
import { updateUser } from "@/services/firebase";
import { useCenter } from "@/store/center";

const CenterSelector = () => {
  const { user } = useUserStore();
  const { bottomSheetRef, openBottomSheet } = useDynamicBottomSheet();
  const { setCenter, center } = useCenter();
  const { mutateAsync: updateUserCenterAsync } = useMutation({
    mutationFn: updateUser,
  });

  const { data: allCenters } = useQuery({
    queryKey: ["allCenter"],
    queryFn: fetchAllCentersData,
  });

  const loadCenterOnStart = async () => {
    if (!center) {
      if (user?.centers.length && user.centers.length > 0) {
        setCenter(user.centers[0]);
      }
    }
  };

  useEffect(() => {
    loadCenterOnStart();
  }, []);

  const handlePickerChange = useCallback(
    (centerId: string, index: number) => {
      if (allCenters && allCenters.length > 0) {
        const selection = allCenters[index];
        if (selection) {
          const updatedCenter = {
            centerId: selection.id,
            countryCode: selection.country.code,
            name: selection.name,
          };
          updateUserCenterAsync({
            centers: [updatedCenter],
          });
          setCenter(updatedCenter);
        }
      }
    },
    [allCenters, setCenter, updateUserCenterAsync],
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
            {center?.name}
          </Text>
          <ArrowDownIcon fill={colors.secondary} />
        </Box>
      </TouchableOpacity>
      <DynamicBottomSheet bottomSheetModalRef={bottomSheetRef}>
        <Picker
          selectedValue={center?.centerId}
          onValueChange={handlePickerChange}
          itemStyle={{ fontSize: 16, fontFamily: "Manrope-SemiBold" }}
          mode="dialog"
        >
          {allCenters?.map((location) => (
            <Picker.Item
              key={location.id}
              label={`${location.display_name}, ${location.country.code}`}
              value={location.id}
            />
          ))}
        </Picker>
      </DynamicBottomSheet>
    </>
  );
};

export default CenterSelector;
