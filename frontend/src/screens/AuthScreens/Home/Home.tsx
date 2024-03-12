import { CButton } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import { fetchAllCentersData } from "@/services/zenoti/centers";
import { UseUserStore } from "@/store/user.store";
import type { ApplicationScreenProps } from "@/types/navigation";
import auth from "@react-native-firebase/auth";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

function Home({ navigation }: ApplicationScreenProps) {
  const { clearUser } = UseUserStore();
  const { data: locations, refetch } = useQuery({
    queryKey: ["fetchCenters"],
    queryFn: fetchAllCentersData,
  });

  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 3000);
  }, []);

  const handleLogout = () => {
    auth().signOut();
    clearUser();
  };

  return (
    <SafeScreen>
      <CButton onPress={handleLogout}>Logout</CButton>
    </SafeScreen>
  );
}

export default Home;
