import {
  FinishOnBoarding,
  LoadingScreen,
  Locations,
  ProfileSetup,
  QuestionStep,
  Welcome,
} from "@/screens";
import { ApplicationStackParamList } from "@/types/navigation";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator<ApplicationStackParamList>();

const OnBoardingStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="Locations" component={Locations} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="QuestionStep" component={QuestionStep} />
      <Stack.Screen name="FinishOnBoarding" component={FinishOnBoarding} />
    </Stack.Navigator>
  );
};

export default OnBoardingStackNavigator;
