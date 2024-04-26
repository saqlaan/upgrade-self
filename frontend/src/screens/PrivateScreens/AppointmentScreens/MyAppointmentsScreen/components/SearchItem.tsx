import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { Box } from "@/components/atoms";
import { colors } from "@/theme";
import { SearchIcon } from "@/theme/assets/icons";
import { variantFamily } from "@/theme/fonts";

type SearchInputProps = TextInputProps;

const SearchItem = React.memo((props: SearchInputProps) => {
  return (
    <Box
      alignItems="center"
      row
      gap="2"
      radius="3"
      px="4"
      py="4"
      style={styles.inputWrapper}
    >
      <SearchIcon />
      <TextInput
        placeholderTextColor={colors["black-100"]}
        cursorColor={colors.primary}
        autoCapitalize={"none"}
        autoCorrect={false}
        autoComplete="off"
        style={styles.inputStyles}
        {...props}
      />
    </Box>
  );
});

SearchItem.displayName = "SearchItem";
export default SearchItem;

const styles = StyleSheet.create({
  inputWrapper: {
    borderWidth: 1,
    borderColor: colors["black-100"],
    height: 55,
  },
  settings: {
    height: 55,
  },
  inputStyles: {
    height: 52,
    fontSize: 16,
    fontFamily: variantFamily["semi-bold"],
    color: colors["black-400"],
    flex: 1,
  },
});
