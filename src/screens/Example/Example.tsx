import auth from "@react-native-firebase/auth";
import { useQuery } from "@tanstack/react-query";
import i18next from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Button, ScrollView } from "react-native";

import { SafeScreen } from "@/components/template";
import { fetchOne } from "@/services/users";
import { useTheme } from "@/theme";

import { isImageSourcePropType } from "@/types/guards/image";

import ColorsWatchImage from "@/theme/assets/images/colorswatch.png";
import SendImage from "@/theme/assets/images/send.png";
import TranslateImage from "@/theme/assets/images/translate.png";

function Example() {
  const { t } = useTranslation(["example", "welcome"]);

  const logout = auth;
  const {
    colors,
    variant,
    changeTheme,
    layout,
    gutters,
    fonts,
    components,
    backgrounds,
  } = useTheme();

  const [currentId, setCurrentId] = useState(-1);

  const { isSuccess, data, isFetching } = useQuery({
    queryKey: ["example", currentId],
    queryFn: () => {
      return fetchOne(currentId);
    },
    enabled: currentId >= 0,
  });

  useEffect(() => {
    if (isSuccess) {
      Alert.alert(t("example:welcome", data.name));
    }
  }, [isSuccess, data]);

  const onChangeTheme = () => {
    changeTheme(variant === "default" ? "dark" : "default");
  };

  const onChangeLanguage = (lang: "fr" | "en") => {
    void i18next.changeLanguage(lang);
  };

  if (
    !isImageSourcePropType(SendImage) ||
    !isImageSourcePropType(ColorsWatchImage) ||
    !isImageSourcePropType(TranslateImage)
  ) {
    throw new Error("Image source is not valid");
  }

  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={[
          layout.flex_1,
          layout.justifyCenter,
          layout.itemsCenter,
        ]}
      >
        <Button onPress={() => auth().signOut()} title="Logout" />
      </ScrollView>
    </SafeScreen>
  );
}

export default Example;
