import React, { ReactNode } from "react";
import { Pressable, StyleSheet, ViewProps } from "react-native";
import Text from "../Text/Text";
import Box from "../Box/Box";
import colors from "@/theme/colors";

interface DummyInputProps extends ViewProps {
  placeholder?: string;
  inputRightIcon?: ReactNode;
  value?: string;
  onPress: () => void;
}

const DummyInput: React.FC<DummyInputProps> = ({
  placeholder = "",
  inputRightIcon,
  value,
  onPress,
  ...props
}) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        row
        px="4"
        radius="2"
        alignItems="center"
        justifyContent="space-between"
        style={[styles.inputView]}
        {...props}
      >
        <Box>
          {value ? (
            <Text variant="text-md-semi-bold" color="black-400">
              {value}
            </Text>
          ) : (
            <Text variant="text-md-semi-bold" color="black-300">
              {placeholder}
            </Text>
          )}
        </Box>
        <Box>{inputRightIcon}</Box>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  inputView: {
    borderWidth: 1.5,
    borderBlockColor: colors["grey-500"],
    borderLeftColor: colors["grey-500"],
    borderRightColor: colors["grey-500"],
    height: 52,
  },
});

export default DummyInput;
