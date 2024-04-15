import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getServices } from "@/services/firebaseApp/appointment";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";
import { useCenter } from "@/store/center";

export const useBookAppointment = () => {
  const { center } = useCenter();
  const { setAvailableServices } = useCreateAppointmentStore();
  const {
    data: services,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ["servicesData"],
    queryFn: () => getServices(center),
  });

  useEffect(() => {
    setAvailableServices(services?.services || []);
  }, [services?.services, setAvailableServices]);

  return {
    services: services?.services,
    isFetching,
    isFetched,
  };
};
