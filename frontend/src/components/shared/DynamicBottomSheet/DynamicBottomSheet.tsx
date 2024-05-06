import React, { ReactNode, useCallback, useState } from "react";
import { Pressable } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "@/components/atoms";

const DynamicBottomSheet = ({
  children,
  bottomSheetModalRef,
  snapPoints,
  name,
}: {
  name?: string;
  children: ReactNode;
  snapPoints?: string[];
  bottomSheetModalRef: React.Ref<BottomSheetModal>;
}) => {
  const [dynamicSnapPoints, setDynamicSnapPoint] = useState([100]);
  const { bottom } = useSafeAreaInsets();

  const handlelayout = useCallback(
    (event) => {
      if (!snapPoints) {
        const { height } = event.nativeEvent.layout;
        setDynamicSnapPoint([height + bottom + 30]);
      }
    },
    [bottom, snapPoints],
  );

  const closeBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, [bottomSheetModalRef]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints ? snapPoints : dynamicSnapPoints}
      backdropComponent={({ style }) => (
        <Box style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}>
          <Pressable style={{ flex: 1 }} onPress={closeBottomSheet} />
        </Box>
      )}
      name={name}
    >
      <BottomSheetView onLayout={handlelayout}>
        <Box>{children}</Box>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default DynamicBottomSheet;
