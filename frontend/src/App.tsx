import React from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MMKV } from "react-native-mmkv";
import { PaperProvider } from "react-native-paper";
import ApplicationNavigator from "./navigators/MainStackNavigator";
import "./translations";
import { theme } from "./theme/theme.config";

const queryClient = new QueryClient();

export const storage = new MMKV();

console.error = () => null;
function App() {
  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <ApplicationNavigator />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </PaperProvider>
  );
}

export default App;
