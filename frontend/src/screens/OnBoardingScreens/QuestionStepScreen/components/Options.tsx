import React from "react";
import OptionItem from "./OptionItem";
import { Box } from "@/components/atoms";
import { OptionType } from "@/types";

const Options = ({
  options,
  onOptionSelection,
}: {
  options: OptionType[];
  onOptionSelection: (option: OptionType) => void;
}) => {
  return (
    <Box>
      {options.map((option) => (
        <OptionItem
          key={option.id}
          option={option}
          onOptionPressed={(option: OptionType) => onOptionSelection(option)}
        />
      ))}
    </Box>
  );
};

export default Options;
