import React from "react";
import Box from "../Box/Box";
import { spacing } from "@/theme";

interface RoundedTopProps {
  bgColor?: string;
  radius?: number;
}

const RoundedTop: React.FC<RoundedTopProps> = ({
  bgColor = "white",
  radius = 4,
}) => {
  return (
    <Box
      py={radius}
      radius={radius}
      bgColor={bgColor}
      style={{ marginTop: -spacing[radius] }}
    ></Box>
  );
};

export default RoundedTop;
