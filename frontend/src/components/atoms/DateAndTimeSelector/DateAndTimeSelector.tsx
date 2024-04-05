import { format } from "date-fns";
import React, { ReactNode, useMemo, useState } from "react";
import { Pressable, StyleSheet, TextInputProps, View } from "react-native";
import DatePicker, { DatePickerProps } from "react-native-date-picker";
import { Icon, useTheme } from "react-native-paper";
import Box from "../Box/Box";
import Spacer from "../Spacer/Spacer";
import Text from "../Text/Text";
import { AppTheme } from "@/types/theme";
import { spacing } from "@/theme/spacing";
import colors from "@/theme/colors";
import { CalendarIcon } from "@/theme/assets/icons";

interface CustomTextInputProps extends TextInputProps {
  error: string | undefined;
  label?: string;
  icon?: ReactNode;
  inputHints?: string[];
  value?: string;
  maximumDate?: Date;
  minimumDate?: Date;
  visibleValue?: string;
  customRightIcon?: ReactNode;
  title?: string;
  pickerProps: DatePickerProps;
}

const DateAndTimeSelector: React.FC<CustomTextInputProps> = ({
  placeholder,
  onChangeText,
  error,
  label,
  icon,
  textContentType,
  inputHints,
  value,
  maximumDate,
  minimumDate,
  visibleValue,
  customRightIcon,
  pickerProps,
  ...props
}) => {
  const { colors, spacing } = useTheme<AppTheme>();
  const [open, setOpen] = useState(false);

  const formatedValue = useMemo(() => {
    return value === "" ? new Date() : new Date(value);
  }, [value]);

  return (
    <>
      <Box>
        {label && (
          <Text color={"black-300"} variant={"text-sm-medium"}>
            {label}
          </Text>
        )}
        <Spacer marginBottom={spacing[2]} />
      </Box>
      <Pressable
        onPress={() => setOpen(true)}
        style={[
          styles.inputView,
          error
            ? {
                borderColor: colors.error,
                borderLeftColor: colors.error,
                borderRightColor: colors.error,
              }
            : {},
        ]}
      >
        {icon}
        <Text variant={"text-md-semi-bold"} style={styles.inputText}>
          {value && (value === "" ? "" : format(new Date(value), "dd.MM.yyyy"))}
          {visibleValue && visibleValue}
        </Text>
        {customRightIcon ? (
          customRightIcon
        ) : (
          <CalendarIcon width={spacing[6]} height={spacing["6"]} />
        )}
      </Pressable>
      <Spacer marginTop={spacing[2]} />
      {inputHints && !error && props.value == "" && (
        <View>
          {inputHints.map((hint, index) => (
            <View key={index} style={styles.hintRow}>
              <Icon
                size={spacing[3]}
                color={colors["black-300"]}
                source={"circle-medium"}
              />
              <Text color={"black-300"} variant={"text-sm-regular"}>
                {hint}
              </Text>
            </View>
          ))}
        </View>
      )}
      <DatePicker
        modal
        open={open}
        date={formatedValue}
        onCancel={() => {
          setOpen(false);
        }}
        mode={"date"}
        title={"Select Date"}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        {...pickerProps}
        onConfirm={(date) => {
          setOpen(false);
          onChangeText && onChangeText(date.toString());
          pickerProps.onConfirm && pickerProps.onConfirm(date);
        }}
      />
      {error && (
        <>
          <Text color={"error"} style={{ color: colors.error }}>
            {error}
          </Text>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputView: {
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: spacing[4],
    justifyContent: "center",
    alignItems: "center",
    gap: spacing[4],
    borderWidth: 1.5,
    borderColor: colors["grey-500"],
    borderLeftColor: colors["grey-500"],
    borderRightColor: colors["grey-500"],
    flexDirection: "row",
  },
  inputText: {
    height: 52,
    lineHeight: 52,
    flex: 1,
  },
  hintRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginBottom: spacing[2],
  },
});

export default DateAndTimeSelector;
