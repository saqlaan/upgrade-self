import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "@/components/atoms";
import { colors, spacing } from "@/theme";
import {
  AddSquareFilledIcon,
  CalendarBottomTabIcon,
  CalendarBottomTabIconFilled,
  GraohSquareFilled,
  GraphSquareIcon,
  HomeFilledIcon,
  HomeOutlineIcon,
  UserCircleIcon,
} from "@/theme/assets/icons";
import { isIOS } from "@/utils/functions";

type TabIconProps = {
  active: boolean;
};

const TabIcons = {
  HomeScreen: {
    icon: ({ active }: TabIconProps) =>
      active ? <HomeFilledIcon /> : <HomeOutlineIcon />,
  },
  MyAppointmentsScreen: {
    icon: ({ active }: TabIconProps) =>
      active ? <CalendarBottomTabIconFilled /> : <CalendarBottomTabIcon />,
  },
  StatsScreen: {
    icon: ({ active }: TabIconProps) =>
      active ? <GraohSquareFilled /> : <GraphSquareIcon />,
  },
  ProfileTab: {
    icon: ({ active }: TabIconProps) => <UserCircleIcon />,
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
            style={{
              flex: 1,
              alignItems: "center",
              paddingBottom: 5,
              paddingTop: 10,
            }}
          >
            <Box
              alignItems="center"
              justifyContent="center"
              style={[!isIOS && { paddingBottom: 10 }]}
            >
              <Box
                mb="1"
                bgColor={isFocused ? "primary" : "white"}
                style={[{ width: 5, height: 5, borderRadius: 5 }]}
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
