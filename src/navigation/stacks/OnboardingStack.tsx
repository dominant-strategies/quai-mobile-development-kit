import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack';

import { OnboardingLandingScreen } from 'src/screens/onboarding/OnboardingLandingScreen';
import { SetupNameAndPFPScreen } from 'src/screens/onboarding/SetupNameAndPFPScreen';
import { SetupLocationScreen } from 'src/screens/onboarding/SetupLocationScreen';
import { OnboardingTerms } from 'src/screens/onboarding/OnboardingTerms';
import { LoginLandingScreen } from 'src/screens/onboarding/LoginLandingScreen';
import { LoginQRCodeScanScreen } from 'src/screens/onboarding/LoginQRCodeScanScreen';
import { LoginSeedPhraseInputScreen } from 'src/screens/onboarding/LoginSeedPhraseInputScreen';
import { OnboardingReferralScanScreen } from 'src/screens/onboarding/OnboardingReferralScanScreen';

export type OnboardingStackParamList = {
  OnboardingLanding: undefined;
  SetupLocation: undefined;
  SetupNameAndPFP: undefined;
  OnboardingTerms: undefined;
  LoginLanding: undefined;
  LoginQRCodeScan: undefined;
  LoginSeedPhraseInput: undefined;
  OnboardingReferralScan: undefined;
};

export type OnboardingStackNavigationProp<
  Route extends keyof OnboardingStackParamList,
> = StackNavigationProp<OnboardingStackParamList, Route>;

export type OnboardingStackScreenProps<
  Route extends keyof OnboardingStackParamList,
> = StackScreenProps<OnboardingStackParamList, Route>;

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="OnboardingLanding"
    >
      <Stack.Screen
        name="OnboardingLanding"
        component={OnboardingLandingScreen}
      />
      <Stack.Screen name="SetupLocation" component={SetupLocationScreen} />
      <Stack.Screen name="SetupNameAndPFP" component={SetupNameAndPFPScreen} />
      <Stack.Screen name="OnboardingTerms" component={OnboardingTerms} />
      <Stack.Screen name="LoginLanding" component={LoginLandingScreen} />
      <Stack.Screen name="LoginQRCodeScan" component={LoginQRCodeScanScreen} />
      <Stack.Screen
        name="LoginSeedPhraseInput"
        component={LoginSeedPhraseInputScreen}
      />
      <Stack.Screen
        name="OnboardingReferralScan"
        component={OnboardingReferralScanScreen}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
