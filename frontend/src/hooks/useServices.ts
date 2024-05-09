import { useCallback } from "react";
import { useCenterStore } from "@/store/centerStore";
import { useServicesStore } from "@/store/servicesStore";
import { getServices } from "@/services/firebaseApp/appointment";

export const useServices = () => {
  const { center } = useCenterStore();
  const { setServices, setIsLoadingServices, services } = useServicesStore();

  const loadServices = useCallback(async () => {
    if (!center) return null;
    const services = await getServices(center);
    setServices(services?.services || []);
    setIsLoadingServices(false);
  }, [center, setIsLoadingServices, setServices]);

  return {
    loadServices,
    services,
  };
};
