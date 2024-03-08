import { Box } from "@/components/atoms";
import { OptionType } from "@/types";
import OptionItem from "./OptionItem";

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
