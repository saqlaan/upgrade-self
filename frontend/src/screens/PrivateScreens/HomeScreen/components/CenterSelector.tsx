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
  const { setCenter, center: selectedCenter } = useCenter();
  const { mutateAsync: updateUserCenterAsync } = useMutation({
    mutationFn: updateUser,
  });

  const { data: centers } = useQuery({
    queryKey: ["allCenter"],
    queryFn: fetchAllCentersData,
  });

  const center = centers?.find(
    (center) => center.id === user?.centers[0].centerId,
  );

  useEffect(() => {
    setCenter({
      centerId: center?.id,
      countryCode: center?.country.code,
      name: center?.name,
    });
  }, []);

  const handlePickerChange = useCallback(
    (centerId: string, index: number) => {
      if (centers && centers.length > 0) {
        const selection = centers[index];
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
    [centers, setCenter, updateUserCenterAsync],
  );

  console.log(selectedCenter);

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
          selectedValue={selectedCenter?.centerId}
          onValueChange={handlePickerChange}
          itemStyle={{ fontSize: 16, fontFamily: "Manrope-SemiBold" }}
          hitSlop={true}
        >
          {centers?.map((location) => (
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
