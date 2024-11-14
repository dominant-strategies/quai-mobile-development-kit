import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
  StackNavigationProp,
} from '@react-navigation/stack';

import { ReceiveAmountInputScreen } from 'src/screens/receive/ReceiveAmountInputScreen';
import { ReceiveQRScreen } from 'src/screens/receive/ReceiveAmountScreen';
import { Currency } from 'src/types';

export type ReceiveStackParamList = {
  ReceiveAmountInput: undefined;
  ReceiveQR: {
    amount: number;
    currency: Currency;
  };
};

export type ReceiveStackScreenProps<Route extends keyof ReceiveStackParamList> =
  StackScreenProps<ReceiveStackParamList, Route>;

export type ReceiveStackNavigationProps<
  Route extends keyof ReceiveStackParamList,
> = StackNavigationProp<ReceiveStackParamList, Route>;

const Stack = createStackNavigator<ReceiveStackParamList>();

const ReceiveStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ReceiveAmountInput"
        component={ReceiveAmountInputScreen}
      />
      <Stack.Screen name="ReceiveQR" component={ReceiveQRScreen} />
    </Stack.Navigator>
  );
};

export default ReceiveStack;
