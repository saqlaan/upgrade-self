import React, { useCallback, useState } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SearchBar, BottomFilterSheet, DateSelection } from "./SearchFilters";
import { BackButton, Box, Text } from "@/components/atoms";
import { Images } from "@/theme/assets/images";
import { spacing } from "@/theme";
import { DynamicBottomSheet } from "@/components";
import { useDynamicBottomSheet } from "@/hooks";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";

export function BookAppointmentHeader() {
  const { top } = useSafeAreaInsets();
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } =
    useDynamicBottomSheet();
  const [selectedService, setSelectedService] = useState();
  const [openServicesList, setOpenServicesList] = useState(false);

  const { availableServices } = useCreateAppointmentStore();

  const handleOnChangeService = useCallback((item) => {
    setSelectedService(item);
    setOpenServicesList(false);
  }, []);

  const renderItem = useCallback(({ item: service, index }) => {
    return (
      <TouchableOpacity onPress={() => handleOnChangeService(service)}>
        <Box key={service.id} mb="5">
          <Text variant="text-sm-medium" color="white">
            {service.name}
          </Text>
        </Box>
      </TouchableOpacity>
    );
  }, []);

  return (
    <Box>
      <ImageBackground
        style={[
          styles.topSection,
          { paddingTop: top, paddingBottom: spacing[6] },
        ]}
        source={Images.BookAppointmentBg}
      >
        <Box row alignItems="center" justifyContent="space-between">
          <BackButton />
          <Box style={styles.title}>
            <Text variant="text-xl-bold" color="white">
              Book an appointment
            </Text>
          </Box>
        </Box>
        {/* Search section */}
        <Box mt="6">
          <SearchBar
            onPressSearch={() => setOpenServicesList(true)}
            onPressFilters={() => openBottomSheet()}
            value={selectedService?.name}
          />
        </Box>
        {availableServices.length > 0 && openServicesList && (
          <Box mt="6" style={{ height: 300 }}>
            <FlatList
              data={availableServices || []}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </Box>
        )}

        {/* Selecting date section */}
        {availableServices.length > 0 && !openServicesList && (
          <Box mt="6">
            <DateSelection />
          </Box>
        )}
      </ImageBackground>
      <DynamicBottomSheet bottomSheetModalRef={bottomSheetRef}>
        <BottomFilterSheet onPressCancel={() => closeBottomSheet()} />
      </DynamicBottomSheet>
    </Box>
  );
}

const styles = StyleSheet.create({
  topSection: {
    paddingHorizontal: spacing[4],
    justifyContent: "center",
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
