import React, { ReactNode, useCallback, useState } from "react";
import { Pressable } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "@/components/atoms";

const DynamicBottomSheet = ({
  children,
  bottomSheetModalRef,
}: {
  children: ReactNode;
  bottomSheetModalRef: React.Ref<BottomSheetModal>;
}) => {
  const [snapPoints, setSnapPoints] = useState([100]);
  const { bottom } = useSafeAreaInsets();

  const handlelayout = useCallback(
    (event) => {
      const { height } = event.nativeEvent.layout;
      setSnapPoints([height + bottom]);
    },
    [bottom],
  );

  const closeBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, [bottomSheetModalRef]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={({ style }) => (
        <Box style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}>
          <Pressable style={{ flex: 1 }} onPress={closeBottomSheet} />
        </Box>
      )}
    >
      <BottomSheetView>
        <Box onLayout={handlelayout}>{children}</Box>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default DynamicBottomSheet;
