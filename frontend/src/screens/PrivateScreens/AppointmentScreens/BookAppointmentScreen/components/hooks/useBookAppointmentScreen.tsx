import { useEffect } from "react";
import { useCenter } from "@/store/center";
import { useServicesStore } from "@/store/servicesStore";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";
import { getServices } from "@/services/firebaseApp/appointment";

export const useBookAppointmentScreen = () => {
  const { center } = useCenter();
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
