import auth from "@react-native-firebase/auth";
import { useTranslation } from "react-i18next";
import { Button, ScrollView } from "react-native";

import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { useCallback } from "react";

function Example() {
  const { t } = useTranslation(["example", "welcome"]);
  const { layout } = useTheme();

  const handleLogout = useCallback(() => {
    auth().signOut();
  }, []);

  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={[
          layout.flex_1,
          layout.justifyCenter,
          layout.itemsCenter,
        ]}
      >
        <Button onPress={handleLogout} title="Logout" />
      </ScrollView>
    </SafeScreen>
  );
}

export default Example;
