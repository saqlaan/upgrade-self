import React from "react";
import {
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Icon, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import { BackButton, Box, Text } from "@/components/atoms";
import { Images } from "@/theme/assets/images";
import { colors, spacing } from "@/theme";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AppTheme } from "@/types/theme";
import { useUserStore } from "@/store/userStore";
import { MapPointIcon } from "@/theme/assets/icons";

function ProfileSceenButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  const { colors } = useTheme<AppTheme>();
  return (
    <Box mb="2">
      <Pressable onPress={onPress}>
        <Box
          row
          justifyContent="space-between"
          alignItems="center"
          bgColor="grey-500"
          px={"4"}
          py={"6"}
          style={styles.button}
        >
          <Text variant="text-md-semi-bold" color="black-500">
            {title}
          </Text>
          <Box>
            <Icon
              size={spacing[6]}
              source={"chevron-right"}
              color={colors["black-300"]}
            />
          </Box>
        </Box>
      </Pressable>
    </Box>
  );
}

function ProfileScreen({ navigation }: ApplicationScreenProps) {
  const { spacing } = useTheme<AppTheme>();
  const { top } = useSafeAreaInsets();
  const { user } = useUserStore();

  const handleLogout = () => {
    auth().signOut();
  };

  const buttonsData = [
    {
      title: "Edit Profile",
      onPress: () => navigation.navigate("EditProfileScreen"),
    },
    {
      title: "Billing Info",
      onPress: () => navigation.navigate("BillingInfoScreen"),
    },
    {
      title: "Change Password",
      onPress: () => navigation.navigate("ChangePasswordScreen"),
    },
  ];

  const getInitials = () => {
    const { firstName, lastName } = user;
    const firstInitial = firstName.charAt(0).toUpperCase() || "";
    const lastInitial = lastName.charAt(0).toUpperCase() || "";
    return firstInitial + lastInitial;
  };

  return (
    <Box flex={1} bgColor="white">
      <StatusBar barStyle={"light-content"} backgroundColor={colors.primary} />
      <ImageBackground
        style={[styles.topSection, { paddingTop: top }]}
        source={Images.ProfileBg}
      >
        <Box row alignItems="center" justifyContent="space-between">
          <BackButton />
          <Box style={styles.title}>
            <Text variant="text-xl-bold" color="white">
              My Profile
            </Text>
          </Box>
        </Box>
      </ImageBackground>
      <Box flex={1} style={styles.roundedTop}>
        <Box alignItems="center" justifyContent="center" style={styles.nameBox}>
          <Box
            bgColor="secondary"
            alignItems="center"
            justifyContent="center"
            style={{ width: 70, height: 70, borderRadius: spacing[2] }}
          >
            <Text color="white" variant="display-xs-bold">
              {getInitials()}
            </Text>
          </Box>
        </Box>
        <Box pt="8" pb="5" />
        <Box alignItems="center" mb="2">
          <Text variant="display-xs-bold">{`${user?.firstName} ${user?.lastName}`}</Text>
        </Box>
        <Box row alignItems="center" justifyContent="center" gap="1">
          <Icon size={spacing[5]} source={MapPointIcon} />
          <Text variant="text-md-bold">{user?.city || ""}</Text>
        </Box>
        <Box px="5" py="5">
          {buttonsData.map(({ title, onPress }, index) => (
            <ProfileSceenButton key={index} title={title} onPress={onPress} />
          ))}
        </Box>
      </Box>
      <Box alignItems="center" py="5">
        <Pressable onPress={handleLogout}>
          <Text variant="text-md-semi-bold">Sign out</Text>
        </Pressable>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  topSection: {
    paddingHorizontal: spacing[4],
    justifyContent: "center",
    minHeight: 100,
    height: 180,
    paddingBottom: spacing[10],
  },
  button: {
    borderRadius: spacing[2],
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  nameBox: {
    position: "absolute",
    top: -35,
    left: 0,
    right: 0,
    zIndex: 100,
    borderRadius: spacing[2],
  },
  roundedTop: {
    backgroundColor: "#fff",
    borderTopLeftRadius: spacing[4],
    borderTopRightRadius: spacing[4],
    position: "relative",
    top: -spacing[4],
    zIndex: 7,
  },
});

export default ProfileScreen;
