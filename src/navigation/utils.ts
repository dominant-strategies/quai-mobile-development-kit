import { createNavigationContainerRef } from '@react-navigation/native';

import { RootStackParamList } from '.';
import { Currency, Transaction } from '../types';

const ref = createNavigationContainerRef<RootStackParamList>();

const goHome = () => ref.current?.navigate('Main', { screen: 'Home' });
const landing = () => ref.current?.navigate('Onboarding', {screen: 'OnboardingLanding'});
const nameAndPFP = () => ref.current?.navigate('Onboarding', {screen: 'SetupNameAndPFP'})
const transactionConfirmation = (
  receiverAddress: string,
  tip: number,
  senderAddress: string,
  input: {
    unit: Currency;
    value: string;
  },
  transaction?: Transaction,
  receiverPFP?: string,
  receiverUsername?: string,
  ) => ref.current?.navigate('SendStack', {
  screen: 'SendConfirmation',
  params: {
    receiverAddress,
    tip,
    senderAddress,
    input,
    transaction,
    receiverPFP,
    receiverUsername,
  },
})
export const RootNavigator = {
  goHome,
  landing,
  nameAndPFP,
  transactionConfirmation,
  navigate: ref?.navigate,
  ref,
};
