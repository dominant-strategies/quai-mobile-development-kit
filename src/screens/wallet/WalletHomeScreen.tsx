import React, { useCallback } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';

import { Theme } from 'src/types';
import { useTheme } from 'src/shared/context/themeContext';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { styledColors, typography } from 'src/styles';

import QuaiWalletScreen from './QuaiWalletScreen';
import QiWalletScreen from './QiWalletScreen';

import { MainTabStackScreenProps } from 'src/navigation/stacks/MainStack';

const TopBar = createMaterialTopTabNavigator();

const WalletHomeScreen: React.FC<MainTabStackScreenProps<'WalletHome'>> = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const topTabBarScreenOptions = useThemedStyle(
    topTabBarScreenOptionsGenerator(isDarkMode),
  );

  const lazyPlaceholderStyle = (isDarkTheme: boolean) =>
    ({
      flex: 1,
      backgroundColor: isDarkTheme ? styledColors.black : styledColors.light,
    } as StyleProp<ViewStyle>);

  const LazyPlaceholder = useCallback(
    () => <View style={lazyPlaceholderStyle(isDarkMode)} />,
    [isDarkMode],
  );

  return (
    <TopBar.Navigator
      screenOptions={{ ...topTabBarScreenOptions, lazy: true }}
      initialRouteName={'QuaiWalletScreen'}
    >
      <TopBar.Screen
        name="Wallet"
        component={QuaiWalletScreen}
        options={{
          title: 'Quai',
          lazyPlaceholder: LazyPlaceholder,
        }}
      />
      <TopBar.Screen
        name="QiWallet"
        component={QiWalletScreen}
        options={{
          title: 'Qi',
          lazyPlaceholder: LazyPlaceholder,
        }}
      />
    </TopBar.Navigator>
  );
};

const topTabBarScreenOptionsGenerator =
  (isDarkMode: boolean) => (theme: Theme) =>
    ({
      tabBarStyle: {
        backgroundColor: isDarkMode
          ? styledColors.black
          : styledColors.lightGray,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: theme.secondary,
        marginBottom: 50,
        top: 0,
        position: 'absolute',
        width: '100%',
        marginHorizontal: 2,
      },
      tabBarItemStyle: {
        height: 40,
        paddingTop: 3,
      },
      tabBarInactiveTintColor: isDarkMode
        ? styledColors.white
        : styledColors.darkGray,
      tabBarActiveTintColor: styledColors.black,
      tabBarLabelStyle: {
        ...typography.H3,
        textTransform: 'capitalize',
      },
      tabBarIndicatorContainerStyle: {
        width: '98%', // buffer the 1% on each side
        marginHorizontal: '1%',
        paddingHorizontal: '1%',
      },
      tabBarIndicatorStyle: {
        backgroundColor: styledColors.white,
        borderRadius: 2,
        height: 34,
        marginBottom: 3,
        borderWidth: 1,
        borderColor: theme.secondary,
      },
      tabBarPressColor: 'transparent',
      tabBarPressOpacity: 0.5,
    } as MaterialTopTabNavigationOptions);

export default WalletHomeScreen;