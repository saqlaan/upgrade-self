import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Keyboard } from "react-native";

export const useDynamicBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      bottomSheetRef.current?.present();
    }, 100);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };
  return {
    openBottomSheet,
    closeBottomSheet,
    bottomSheetRef,
  };
};
