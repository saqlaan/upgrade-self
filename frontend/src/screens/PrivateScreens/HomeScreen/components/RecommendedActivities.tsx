import React, { useCallback, useEffect } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, Text } from "@/components/atoms";
import { ActivitiesCard } from "@/components";
import { useServices } from "@/hooks";
import { ZenotiService } from "@/types";

const RecommendedActivities = () => {
  const { loadServices, services } = useServices();
  const navigation = useNavigation();

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const handleOnPressBook = useCallback(
    (service: ZenotiService) => {
      navigation.navigate("BookAppointmentScreen", {
        service,
      });
    },
    [navigation],
  );

  const _renderItem = useCallback(
    ({ item, index }: { item: ZenotiService; index: number }) => {
      return (
        <ActivitiesCard
          title={item.name}
          duration={item.duration}
          index={index}
          onPressBookNow={() => handleOnPressBook(item)}
        />
      );
    },
    [handleOnPressBook],
  );

  return (
    <>
      <Box px="4" row justifyContent="space-between" mb="4">
        <Text variant="text-lg-bold">Recommended Activities:</Text>
      </Box>
      <FlatList
        data={services || []}
        renderItem={_renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Box mr="4" />}
      />
    </>
  );
};

export default RecommendedActivities;
