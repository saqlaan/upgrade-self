import { EmailVerification, Startup, TOS } from "@/screens";
import ForgotPassword from "@/screens/AuthScreens/ForgotPassword/ForgotPassword";
import Login from "@/screens/AuthScreens/Login/Login";
import Signup from "@/screens/AuthScreens/Signup/Signup";
import { ApplicationStackParamList } from "@/types/navigation";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator<ApplicationStackParamList>();

const PublicStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Startup"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Startup" component={Startup} />
      <Stack.Screen name="TOS" component={TOS} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
    </Stack.Navigator>
  );
};

export default PublicStackNavigator;
