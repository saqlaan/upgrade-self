import React, { useCallback } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Box, Text } from "@/components/atoms";
import { colors } from "@/theme";
import { SearchIcon, SettingsIcon } from "@/theme/assets/icons";
import { DynamicBottomSheet } from "@/components";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";
import { useDynamicBottomSheet } from "@/hooks";
import { ZenotiService } from "@/types";
import { useServicesStore } from "@/store/servicesStore";

function SearchBar({ onPressFilters }: { onPressFilters: () => void }) {
  const { selectedService, setSelectedService } = useCreateAppointmentStore();

  const { services, servicesAvailable } = useServicesStore();
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } =
    useDynamicBottomSheet();

  const handleOnChangeService = useCallback((item) => {
    setSelectedService(item);
    closeBottomSheet();
  }, []);

  const renderItem = useCallback(
    ({ item: service }: { item: ZenotiService }) => {
      return (
        <TouchableOpacity onPress={() => handleOnChangeService(service)}>
          <Box px="4" key={service.id} mb="5">
            <Text
              color={
                selectedService?.id === service.id ? "secondary" : "black-600"
              }
            >
              {service.name}
            </Text>
          </Box>
        </TouchableOpacity>
      );
    },
    [handleOnChangeService, selectedService?.id],
  );

  return (
    <Box row gap="2">
      <Pressable
        onPress={servicesAvailable() ? openBottomSheet : () => null}
        style={{ flex: 1 }}
      >
        <Box
          gap="2"
          radius="3"
          flex={1}
          px="4"
          py="4"
          row
          style={styles.inputWrapper}
        >
          <SearchIcon />
          <Text color="white" variant="text-sm-medium">
            {selectedService ? selectedService.name : "Select service"}
          </Text>
        </Box>
      </Pressable>
      <TouchableOpacity onPress={onPressFilters}>
        <Box
          alignItems="center"
          justifyContent="center"
          px="4"
          bgColor={"white"}
          radius="3"
          style={styles.settings}
        >
          <SettingsIcon />
        </Box>
      </TouchableOpacity>
      <DynamicBottomSheet
        snapPoints={["90%"]}
        bottomSheetModalRef={bottomSheetRef}
      >
        <Box mt="6">
          <FlatList
            data={services || []}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </Box>
      </DynamicBottomSheet>
    </Box>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    borderWidth: 1,
    borderColor: colors["primary-300"],
    height: 55,
  },
  settings: {
    height: 55,
  },
});

export default SearchBar;
