import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-native-gesture-handler";
import { MMKV } from "react-native-mmkv";
import { PaperProvider } from "react-native-paper";
import ApplicationNavigator from "./navigators/Application";
import SplashScreen from 'react-native-splash-screen'
import { theme } from "./theme/theme.config";
import "./translations";
import { useEffect } from "react";

const queryClient = new QueryClient();

export const storage = new MMKV();

function App() {
  
  useEffect(()=> {
     SplashScreen.hide();
  }, [])

  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ApplicationNavigator />
      </QueryClientProvider>
    </PaperProvider>
  );
}

export default App;
