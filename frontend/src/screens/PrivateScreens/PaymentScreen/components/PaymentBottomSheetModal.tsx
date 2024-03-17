import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { ReactNode, Ref, useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "@/components/atoms";
import { colors } from "@/theme";

type Props = {
  children: ReactNode;
  bottomSheetRef: Ref<BottomSheetModal>;
};

const PaymentBottomSheetModal = ({ bottomSheetRef, children }: Props) => {
  const handleSheetChanges = useCallback((index: number) => {}, []);
  const { bottom } = useSafeAreaInsets();
  const closeModal = useCallback(() => {
    bottomSheetRef?.current?.close();
  }, [bottomSheetRef]);
  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={[300]}
      onChange={handleSheetChanges}
      style={[styles.modalContainer]}
      backdropComponent={({ style }) => (
        <Box style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}>
          <Pressable style={{ flex: 1 }} onPress={closeModal} />
        </Box>
      )}
    >
      <BottomSheetView
        enableFooterMarginAdjustment
        style={[styles.contentContainer, { paddingBottom: bottom }]}
      >
        <Box px="5" py="5">
          {children}
        </Box>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default PaymentBottomSheetModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors["grey-400"],
  },
});
