import React from "react";
import { Box, Text } from "@/components/atoms";
import { CheckCircleIcon } from "@/theme/assets/icons";
const sessions = ["session 1", "session 2", "session 3", "session 4"];

function SelectCityBottomSheet() {
  return (
    <Box px="4" py="4">
      <Text variant="text-xl-bold" mb="4">
        Select session
      </Text>
      <Box>
        <Box>
          {sessions.map((item, index) => (
            <Box
              key={index}
              pb="2"
              row
              justifyContent="space-between"
              alignItems="center"
              style={{ height: 50 }}
            >
              <Text variant="text-lg-regular">{item}</Text>
              {index === 0 && <CheckCircleIcon />}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default SelectCityBottomSheet;
