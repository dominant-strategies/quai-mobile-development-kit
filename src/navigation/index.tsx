import React from 'react';
import { StatusBar } from 'react-native';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  StackScreenProps,
  TransitionPresets,
} from '@react-navigation/stack';

import ReceiveStack, {
  ReceiveStackParamList,
} from './stacks/ReceiveStack';
import SendStack, { SendStackParamList } from './stacks/SendStack';
import MainStack, { MainTabStackParamList } from './stacks/MainStack';
import OnboardingStack, {OnboardingStackParamList}from './stacks/OnboardingStack';
import ExportStack, {
  ExportStackParamList,
} from './stacks/ExportStack';
import SettingsStack, {
  SettingsStackParamList,
} from './stacks/SettingsStack';


import LinkingStack, {LinkingStackParamList} from './stacks/LinkingStack';

import { useTheme } from 'src/shared/context/themeContext';
import { RootNavigator } from './utils';
import { SnackBar } from 'src/components';
import { IUserProfileState } from 'src/store/models/reducers/userProfile';
import { useSelector } from 'react-redux';

export type RootStackParamList = {
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  Main: NavigatorScreenParams<MainTabStackParamList>;
  ReceiveStack: NavigatorScreenParams<ReceiveStackParamList>;
  SendStack: NavigatorScreenParams<SendStackParamList>;
  ExportStack: NavigatorScreenParams<ExportStackParamList>;
  SettingsStack: NavigatorScreenParams<SettingsStackParamList>;
  LinkingStack: NavigatorScreenParams<LinkingStackParamList>;
};

export type RootStackNavigationProps<Route extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, Route>;

export type RootStackScreenProps<Route extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, Route>;

const Stack = createStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['quaimdk://'],
  config: {
    screens: {
      MainStack: {
        path: 'pay/',
        parse: {
          username: (username: string) => {
            console.log('Username ', username);
            return `${username}`;
          },
        },
      },
    },
  },
};

// TODO: refactor to handle app state via context
interface NavigationProps {
  onboarded: boolean;
}

interface IState {
  userProfileReducer: IUserProfileState;
}

export const Navigation = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <NavigationContainer ref={RootNavigator.ref}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent
      />
      <AppNavigator/>
      <SnackBar />
    </NavigationContainer>
  );
};

const AppNavigator = () => {

  const userOnboarded = useSelector(
    (state: IState) => state.userProfileReducer.userOnboarded,
  );
  return (
    <Stack.Navigator
      initialRouteName={userOnboarded ? 'Main' : 'Onboarding'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Onboarding"
        component={OnboardingStack}
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          title: 'onboarding',
        }}
      />
      <Stack.Screen
        name="Main"
        component={MainStack}
        options={{
          gestureEnabled: false,
          title: 'Main',
        }}
      />
      <Stack.Screen
        name="ReceiveStack"
        component={ReceiveStack}
        options={{
          title: 'ReceiveStack',
        }}
      />
      <Stack.Screen
        name="SendStack"
        component={SendStack}
        options={{
          title: 'SendStack',
        }}
      />
      <Stack.Screen
        name="ExportStack"
        component={ExportStack}
        options={{
          title: 'ExportStack',
        }}
      />
      <Stack.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          title: 'SettingsStack',
        }}
      />
      <Stack.Screen
        name="LinkingStack"
        component={LinkingStack}
        options={{
          title: 'LinkingStack',
        }}
      />
    </Stack.Navigator>
  );
};
