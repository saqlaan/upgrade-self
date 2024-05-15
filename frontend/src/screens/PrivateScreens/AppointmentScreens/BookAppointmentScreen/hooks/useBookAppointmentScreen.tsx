import { useCallback, useEffect } from "react";
import { useBookAppointmentMethods } from "./useBookAppointmentMethods";
import { useCenterStore } from "@/store/centerStore";
import { useServicesStore } from "@/store/servicesStore";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";
import { getServices } from "@/services/firebaseApp/appointment";
import { ZenotiService } from "@/types";

type useBookAppointmentScreenType = { service?: ZenotiService | undefined };

export const useBookAppointmentScreen = (
  params: useBookAppointmentScreenType,
) => {
  const { center } = useCenterStore();
  const { setServices, resetStore, setIsLoadingServices } = useServicesStore();
  const {
    resetStore: resetAppointmentStore,
    selectedService,
    filters,
  } = useCreateAppointmentStore();
  const { loadSlots } = useBookAppointmentMethods();

  useEffect(() => {
    resetAppointmentStore({ selectedService: params?.service || null });
    return () => {
      resetAppointmentStore({});
    };
  }, [resetAppointmentStore, resetStore, params?.service]);

  const onStart = useCallback(async () => {
    if (selectedService) {
      await loadSlots({
        service: selectedService,
        date: filters.date,
      });
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

  return {};
};
