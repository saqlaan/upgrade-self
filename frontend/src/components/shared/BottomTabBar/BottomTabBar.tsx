import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "@/components/atoms";
import { colors, spacing } from "@/theme";
import {
  AddSquareFilledIcon,
  CalendarBottomTabIcon,
  GraphSquareIcon,
  HomeOutlineIcon,
  UserCircleIcon,
} from "@/theme/assets/icons";

type TabIconProps = {
  active: boolean;
};

const getColor = (active: boolean) =>
  active ? colors.primary : colors["black-400"];

const TabIcons = {
  HomeScreen: {
    icon: ({ active }: TabIconProps) => (
      <HomeOutlineIcon fill={getColor(active)} />
    ),
  },
  MyAppointmentsScreen: {
    icon: ({ active }: TabIconProps) => (
      <CalendarBottomTabIcon fill={getColor(active)} />
    ),
  },
  StatsScreen: {
    icon: ({ active }: TabIconProps) => (
      <GraphSquareIcon fill={getColor(active)} />
    ),
  },
  ProfileTab: {
    icon: ({ active }: TabIconProps) => (
      <UserCircleIcon fill={getColor(active)} />
    ),
  },
  BookAppointmentTab: {
    icon: ({ active }: TabIconProps) => (
      <AddSquareFilledIcon fill={colors.secondary} />
    ),
  },
};

const BottomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <Box style={[styles.tabBar, { paddingBottom: bottom }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const handleOnPress = () => {
          if (route.name === "BookAppointmentTab") {
            navigation.navigate("BookAppointmentScreen");
            return;
          }
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={handleOnPress}
            key={route.key}
            style={{ flex: 1, alignItems: "center", padding: 20 }}
          >
            <Box alignItems="center" justifyContent="center">
              <Box
                mb="1"
                bgColor={isFocused ? "primary" : "white"}
                style={{ width: 5, height: 5, borderRadius: 5 }}
              />
              {TabIcons[route.name] &&
                TabIcons[route.name].icon({ active: isFocused })}
            </Box>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
};
const styles = StyleSheet.create({
  tabBar: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    borderTopRightRadius: spacing[4],
    borderTopLeftRadius: spacing[4],
  },
});

export default BottomTabBar;
