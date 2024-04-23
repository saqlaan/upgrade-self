import { useEffect } from "react";
import { useCenterStore } from "@/store/centerStore";
import { useServicesStore } from "@/store/servicesStore";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";
import { getServices } from "@/services/firebaseApp/appointment";

export const useBookAppointmentScreen = () => {
  const { center } = useCenterStore();
  const { setServices, resetStore, setIsLoadingServices } = useServicesStore();
  const { resetStore: resetAppointmentStore } = useCreateAppointmentStore();

  useEffect(() => {
    resetStore();
    resetAppointmentStore();
  }, [resetAppointmentStore, resetStore]);

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
