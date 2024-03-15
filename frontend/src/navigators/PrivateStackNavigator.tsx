import { Home, PaymentScreen } from "@/screens";
import { ApplicationStackParamList } from "@/types/navigation";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator<ApplicationStackParamList>();

const PrivateStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="StartupScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

export default PrivateStackNavigator;
