/* eslint-disable react/no-unstable-nested-components */
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import WalletIcon from 'src/assets/account-box-outline.svg';
import SettingsIcon from 'src/assets/icon-settings.svg';
import SendReceiveIcon from 'src/assets/icon-send-receive.svg';
import { ContentComponent } from 'src/components';
import { RootStackScreenProps } from 'src/navigation';
import { useTheme } from 'src/shared/context/themeContext';
import { styledColors, typography } from 'src/styles';

import SettingsScreen from 'src/screens/settings/landing/SettingsScreen';
import HomeScreen from 'src/screens/home/HomeScreen';
import WalletHomeScreen from 'src/screens/wallet/WalletHomeScreen';


export type MainTabStackParamList = {
  WalletHome: undefined;
  Exchange: undefined;
  Home: undefined;
  Earn: undefined;
  Settings: undefined;
};

export type MainTabStackNavigationProp<
  Route extends keyof MainTabStackParamList,
> = BottomTabNavigationProp<MainTabStackParamList, Route>;

export type MainTabStackScreenProps<Route extends keyof MainTabStackParamList> =
  BottomTabScreenProps<MainTabStackParamList, Route>;

const Tab = createBottomTabNavigator<MainTabStackParamList>();

const MainStack: React.FC<RootStackScreenProps<'Main'>> = ({ route }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, theme } = useTheme();
  const [shouldShowBackgroundVariant, setShouldShowBackgroundVariant] =
    useState(true);

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Home' || !routeName) {
      setShouldShowBackgroundVariant(true);
    } else {
      setShouldShowBackgroundVariant(false);
    }
  }, [route]);

  return (
    <ContentComponent
      noNavButton
      hasBackgroundVariant={shouldShowBackgroundVariant}
    >
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="none"
        screenOptions={{
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.primary,
          tabBarActiveBackgroundColor: isDarkMode
            ? styledColors.dark
            : styledColors.lightGray,
          headerShown: false,
          tabBarBadgeStyle: {
            marginTop: insets.bottom,
          },
          tabBarStyle: {
            marginBottom: -insets.bottom,
            backgroundColor: isDarkMode
              ? styledColors.black
              : styledColors.light,
            borderTopColor: isDarkMode
              ? styledColors.darkGray
              : styledColors.border,
          },
          tabBarLabelStyle: { ...typography.default },
        }}
      >
        <Tab.Screen
          name="WalletHome"
          component={WalletHomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <WalletIcon name="wallet" color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <View style={styles.homeTabBarIcon}>
                <SendReceiveIcon name="home" color={color} />
              </View>
            ),
            tabBarLabel: 'Send/Receive',
            tabBarLabelStyle: { ...typography.bold },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <SettingsIcon name="setting" color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </ContentComponent>
  );
};

const styles = StyleSheet.create({
  homeTabBarIcon: {
    top: -18,
  },
});

export default MainStack;
