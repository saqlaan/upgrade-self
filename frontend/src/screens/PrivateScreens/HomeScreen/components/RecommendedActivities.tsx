import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, Text } from "@/components/atoms";
import { ActivitiesCard } from "@/components";
import { ZenotiService } from "@/types";
import { getServices } from "@/services/firebaseApp/appointment";
import { useCenterStore } from "@/store/centerStore";

const RecommendedActivities = () => {
  // TODO: Use services from store
  const { center } = useCenterStore();
  const [services, setServices] = useState<ZenotiService[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (!center) {
      return;
    }
    getServices(center).then((services) => {
      setServices(services?.services || []);
    });
  }, [center]);

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
