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
      <Stack.Screen name="LocationsScreen" component={Locations} />
      <Stack.Screen name="ProfileSetupScreen" component={ProfileSetup} />
      <Stack.Screen name="WelcomeScreen" component={Welcome} />
      <Stack.Screen name="QuestionStepScreen" component={QuestionStep} />
      <Stack.Screen
        name="FinishOnBoardingScreen"
        component={FinishOnBoarding}
      />
    </Stack.Navigator>
  );
};

export default OnBoardingStackNavigator;
