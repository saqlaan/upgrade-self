import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getServices } from "@/services/firebaseApp/appointment";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";
import { useCenter } from "@/store/center";

export const useBookAppointmentScreen = () => {
  const { center } = useCenter();
  const { setAvailableServices, setServicesFound, resetStore, appointment } =
    useCreateAppointmentStore();

  const {
    data: services,
    isFetched,
    isLoading,
  } = useQuery({
    queryKey: ["servicesData"],
    queryFn: () => getServices(center),
  });

  useEffect(() => {
    resetStore();
  }, [resetStore]);

  useEffect(() => {
    setAvailableServices(services?.services || []);
  }, [services?.services, setAvailableServices]);

  useEffect(() => {
    if (isFetched) {
      if (services?.services.length === 0) setServicesFound(false);
      else setServicesFound(true);
    }
  }, [isFetched, services?.services.length, setServicesFound]);

  return {
    services: services?.services,
    isLoading,
    isFetched,
  };
};
