import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

import PaymentReqLinkScreen from 'src/screens/linking/paymentRequest';

export type LinkingStackParamList = {
 RequestLink: { 
    address?: string; 
    amount?: number; 
    token?: string; 
    username: string 
    };
};

export type LinkingStackScreenProps<
  Route extends keyof LinkingStackParamList,
> = StackScreenProps<LinkingStackParamList, Route>;

const Stack = createStackNavigator<LinkingStackParamList>();

const LinkingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RequestLink" component={PaymentReqLinkScreen} />
    </Stack.Navigator>
  );
};

export default LinkingStack;