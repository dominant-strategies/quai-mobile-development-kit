/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { styledColors } from 'src/styles';
import { Currency, Transaction } from 'src/types';

import SendScanScreen from 'src/screens/send/SendScan';
import SendAmountScreen from 'src/screens/send/SendAmount';
import SendTipScreen from 'src/screens/send/SendTip';
import SendOverviewScreen from 'src/screens/send/SendOverview';
import SendConfirmationScreen from 'src/screens/send/SendConfirmation';
import { ScannedContactScreen } from 'src/screens/contacts/scannedContact';

import Left from 'src/assets/leftChevron.svg';
import { ContactsListScreen } from 'src/screens/contacts/contactList';
import { ContactProfileScreen } from 'src/screens/contacts/contactProfile';

export type SendStackParamList = {
  SendScan: { address: string; amount: number; username: string };
  ContactScan: {
    quaiAddress: string;
    qiPaymentCode: string;
    username: string;
    profilePicture: string;
  };
  ContactProfile:{
    quaiAddress: string;
    qiPaymentCode: string;
    username: string;
    profilePicture: string;
    contactIndex: number;
  }
  ContactsList: {}
  SendAmount: {
    amount: number;
    currency: string;
    quaiAddress: string;
    qiPaymentCode: string;
    receiverPFP?: string;
    receiverUsername?: string;
    sender: string;
  };
  SendTip: {
    sender: string;
    receiverAddress: string;
    receiverPFP?: string;
    receiverUsername?: string;
    input: {
      unit: Currency;
      value: string;
    };
  };
  SendOverview: {
    receiverAddress: string;
    receiverPFP?: string;
    receiverUsername?: string;
    sender: string;
    input: {
      unit: Currency;
      value: string;
    };
    tip: number;
    totalAmount: string;
  };
  SendConfirmation: {
    transaction?: Transaction;
    receiverAddress: string;
    receiverPFP?: string;
    receiverUsername?: string;
    tip: number;
    senderAddress: string;
    senderUsername?: string;
    senderPFP?: string;
    input: {
      unit: Currency;
      value: string;
    };
  };
};

const Stack = createNativeStackNavigator<SendStackParamList>();
const SendStack = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundColor = isDarkMode ? styledColors.black : styledColors.light;
  const textColor = isDarkMode ? styledColors.white : styledColors.black;

  const textStyle = { color: textColor, fontSize: 24 };
  const buttonStyle = { backgroundColor, marginLeft: 8, width: 30, height: 40 };

  const goBack = useCallback(
    () => (navigation.canGoBack() ? navigation.goBack() : false),
    [navigation],
  );

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SendScan"
    >
      <Stack.Screen
        component={SendScanScreen}
        options={{
          headerShown: false,
        }}
        name="SendScan"
      />
       <Stack.Screen
        name="ContactScan"
        options={{
          headerStyle: { backgroundColor },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text style={textStyle}>ScannedContact</Text>
          ),
          headerLeft: () => (
            <Pressable style={buttonStyle} onPress={goBack}>
              <Left />
            </Pressable>
          ),
          headerBackTitleVisible: false,
          headerTintColor: textColor,
        }}
        component={ScannedContactScreen}
      />
            <Stack.Screen
        name="ContactsList"
        options={{
          headerStyle: { backgroundColor },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text style={textStyle}>Contact List</Text>
          ),
          headerLeft: () => (
            <Pressable style={buttonStyle} onPress={goBack}>
              <Left />
            </Pressable>
          ),
          headerBackTitleVisible: false,
          headerTintColor: textColor,
        }}
        component={ContactsListScreen}
      />
            <Stack.Screen
        name="ContactProfile"
        options={{
          headerStyle: { backgroundColor },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text style={textStyle}>Contact Profile</Text>
          ),
          headerLeft: () => (
            <Pressable style={buttonStyle} onPress={goBack}>
              <Left />
            </Pressable>
          ),
          headerBackTitleVisible: false,
          headerTintColor: textColor,
        }}
        component={ContactProfileScreen}
      />
      <Stack.Screen
        name="SendAmount"
        options={{
          headerStyle: { backgroundColor },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text style={textStyle}>{t('home.send.label')}</Text>
          ),
          headerLeft: () => (
            <Pressable style={buttonStyle} onPress={goBack}>
              <Left />
            </Pressable>
          ),
          headerBackTitleVisible: false,
          headerTintColor: textColor,
        }}
        component={SendAmountScreen}
      />
      <Stack.Screen
        name="SendTip"
        options={{
          headerStyle: { backgroundColor },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text style={textStyle}>{t('home.send.label')}</Text>
          ),
          headerBackTitleVisible: false,
          headerTintColor: textColor,
        }}
        component={SendTipScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text style={textStyle}>{t('home.send.label')}</Text>
          ),
          headerBackTitleVisible: false,
          headerTintColor: textColor,
        }}
        name="SendOverview"
        component={SendOverviewScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text style={textStyle}>{t('home.send.label')}</Text>
          ),
          headerBackTitleVisible: false,
          headerTintColor: textColor,
        }}
        name="SendConfirmation"
        component={SendConfirmationScreen}
      />
    </Stack.Navigator>
  );
};

export default SendStack;
