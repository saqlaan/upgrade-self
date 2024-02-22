import React, { useCallback, useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { HelperText, useTheme } from "react-native-paper";

interface CustomTextInputProps extends TextInputProps {
  error: string | undefined;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  onChangeText,
  inputMode = "text",
  autoCapitalize = "none",
  onBlur,
  error,
  ...props
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleOnBlur = useCallback((e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  }, []);

  return (
    <>
      <View
        style={[
          styles.inputView,
          { backgroundColor: colors.inputBackground },
          isFocused && { borderWidth: 2 },
        ]}
      >
        <TextInput
          style={[styles.inputText, { color: colors.primary }]}
          placeholder={placeholder}
          placeholderTextColor={"#707070"}
          cursorColor={colors.primary}
          onChangeText={onChangeText}
          autoCapitalize={"none"}
          autoCorrect={false}
          onBlur={handleOnBlur}
          onFocus={handleOnFocused}
          {...props}
        />
      </View>
      {error && (
        <HelperText type="error" visible={true}>
          {error}
        </HelperText>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputView: {
    width: "100%",
    borderRadius: 15,
    height: 50,
    padding: 20,
    justifyContent: "center",
    borderBlockColor: "#cfd0d6",
    borderLeftColor: "#cfd0d6",
    borderRightColor: "#cfd0d6",
  },
  inputText: {
    height: 50,
    fontWeight: "500",
  },
});

export default CustomTextInput;
