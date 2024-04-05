import React from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Box } from "@/components/atoms";
import { colors } from "@/theme";
import { SearchIcon, SettingsIcon } from "@/theme/assets/icons";
import { variantFamily } from "@/theme/fonts";

function SearchSession({ onPressFilters }: { onPressFilters: () => void }) {
  return (
    <Box row gap="2">
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
        <TextInput
          style={styles.input}
          autoCapitalize={"none"}
          autoCorrect={false}
          placeholder={"Search session"}
          placeholderTextColor={colors["primary-300"]}
        />
      </Box>
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
    </Box>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    borderWidth: 1,
    borderColor: colors["primary-300"],
    height: 55,
  },
  input: {
    fontFamily: variantFamily.medium,
    fontSize: 16,
    color: colors.white,
  },
  settings: {
    height: 55,
  },
});

export default SearchSession;
