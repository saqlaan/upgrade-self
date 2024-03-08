import { Home } from "@/screens";
import { ApplicationStackParamList } from "@/types/navigation";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator<ApplicationStackParamList>();

const PrivateStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Startup"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default PrivateStackNavigator;
