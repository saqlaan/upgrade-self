import { useCallback, useEffect, useState } from "react";
import { useBookAppointmentMethods } from "./useBookAppointmentMethods";
import { useCenterStore } from "@/store/centerStore";
import { useServicesStore } from "@/store/servicesStore";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";
import { getServices } from "@/services/firebaseApp/appointment";

type UseBookAppointmentScreenProps = {
  isRescheduling?: boolean;
};

export const useBookAppointmentScreen = ({
  isRescheduling = false,
}: UseBookAppointmentScreenProps = {}) => {
  const { center } = useCenterStore();
  const { setServices, resetStore, setIsLoadingServices } = useServicesStore();
  const {
    resetStore: resetAppointmentStore,
    selectedService,
    filters,
  } = useCreateAppointmentStore();
  const { loadSlots } = useBookAppointmentMethods();
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  useEffect(() => {
    if (!isRescheduling) {
      resetStore();
      resetAppointmentStore();
    }
  }, [isRescheduling, resetAppointmentStore, resetStore]);

  const onStart = useCallback(async () => {
    if (selectedService) {
      setIsLoadingSlots(true);
      await loadSlots({
        service: selectedService,
        date: filters.date,
      });
      setIsLoadingSlots(false);
    }
  }, [filters.date, loadSlots, selectedService]);

  useEffect(() => {
    onStart();
  }, [onStart]);

  const loadServices = async () => {
    setIsLoadingServices(true);
    const services = await getServices(center);
    setServices(services?.services || []);
    setIsLoadingServices(false);
  };

  useEffect(() => {
    loadServices();
  }, []);

  return {
    isLoadingSlots,
  };
};
