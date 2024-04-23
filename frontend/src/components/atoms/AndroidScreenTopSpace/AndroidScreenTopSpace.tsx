import React from "react";
import Box from "../Box/Box";
import { isIOS } from "@/utils/functions";

function AndroidScreenTopSpace() {
  if (!isIOS) return <Box my="2" />;
  return null;
}

export default AndroidScreenTopSpace;
