import React, { useCallback, useState } from "react";
import { addHours, format, isAfter, isBefore, startOfDay } from "date-fns";
import SessionBottomSheet from "./SelectSessionBottomSheet";
import SelectCityBottomSheet from "./SelectCityBottomSheet";
import {
  Box,
  CButton,
  DateAndTimeSelector,
  DummyTextInput,
  Text,
} from "@/components/atoms";
import { ArrowDownIcon } from "@/theme/assets/icons";
import { useDynamicBottomSheet } from "@/hooks";
import { DynamicBottomSheet } from "@/components";

type BottomFilterSheetProps = {
  onPressCancel?: () => void;
  onPressApplyFilters?: () => void;
};

function BottomFilterSheet({ onPressCancel }: BottomFilterSheetProps) {
  const [fromTime, setFromTime] = useState(addHours(startOfDay(new Date()), 7));
  const [toTime, setToTime] = useState(addHours(startOfDay(new Date()), 7.5));
  const {
    bottomSheetRef: selectSessionBottomSheetRef,
    openBottomSheet: openSelectSessionBottomSheet,
  } = useDynamicBottomSheet();
  const {
    bottomSheetRef: selectCityBottomSheetRef,
    openBottomSheet: openSelectCityBottomSheet,
  } = useDynamicBottomSheet();

  const handleConfirmFromTime = useCallback(
    (date: Date) => {
      if (isBefore(date, toTime)) {
        setFromTime(date);
      }
    },
    [toTime],
  );

  const handleConfirmToTime = useCallback(
    (date: Date) => {
      if (isAfter(date, fromTime)) {
        setToTime(date);
      }
    },
    [fromTime],
  );

  return (
    <Box px="4" py="4">
      <Text variant="text-xl-bold">Filter</Text>
      <Box mt="4">
        <Text variant="text-sm-medium" color="black-300">
          Time
        </Text>
        <Box row gap="4" mt="2">
          <Box flex={1}>
            <DateAndTimeSelector
              pickerProps={{
                mode: "time",
                title: "Select time",
                date: fromTime,
                onConfirm: handleConfirmFromTime,
              }}
              visibleValue={format(fromTime, "hh:mm a")}
              customRightIcon={<ArrowDownIcon />}
            />
          </Box>
          <Box flex={1}>
            <DateAndTimeSelector
              pickerProps={{
                mode: "time",
                title: "Select time",
                date: toTime,
                onConfirm: handleConfirmToTime,
              }}
              visibleValue={format(toTime, "hh:mm a")}
              customRightIcon={<ArrowDownIcon />}
            />
          </Box>
        </Box>
      </Box>
      <Box mt="4">
        <Text variant="text-sm-medium" color="black-300">
          Session
        </Text>
        <Box row gap="2" mt="2">
          <Box flex={1}>
            <DummyTextInput
              onPress={() => openSelectSessionBottomSheet()}
              placeholder="Demo session"
              inputRightIcon={<ArrowDownIcon />}
            />
          </Box>
        </Box>
      </Box>
      <Box mt="4">
        <Text variant="text-sm-medium" color="black-300">
          City
        </Text>
        <Box row gap="2" mt="2">
          <Box flex={1}>
            <DummyTextInput
              onPress={() => openSelectCityBottomSheet()}
              placeholder="Demo address"
              inputRightIcon={<ArrowDownIcon />}
            />
          </Box>
        </Box>
      </Box>
      <Box mt="4">
        <Box row gap="4" mt="2">
          <Box flex={1}>
            <CButton
              variant={"default"}
              onPress={onPressCancel}
              text="Cancel"
            />
          </Box>
          <Box flex={1}>
            <CButton text="Apply filter" />
          </Box>
        </Box>
      </Box>
      <DynamicBottomSheet bottomSheetModalRef={selectSessionBottomSheetRef}>
        <SessionBottomSheet />
      </DynamicBottomSheet>
      <DynamicBottomSheet bottomSheetModalRef={selectCityBottomSheetRef}>
        <SelectCityBottomSheet />
      </DynamicBottomSheet>
    </Box>
  );
}

export default BottomFilterSheet;
