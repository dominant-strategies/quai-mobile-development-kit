import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  useThemedStyle,
} from 'src/shared/hooks';

import {
  AvatarComponent,
  ButtonComponent,
  ContentComponent,
  AmountDisplay,
  KeyboardComponent,
  TextComponent,
} from 'src/components';
import { Currency, Theme } from 'src/types';
import { abbreviateAddress } from 'src/quai-mdk/addressUtils';

import { ReceiveStackScreenProps } from 'src/navigation/stacks/ReceiveStack';
import { IUserProfileState } from 'src/store/models/reducers/userProfile';
import { IActiveQiWalletAddressState, IActiveWalletAddressState } from 'src/store/models/reducers/wallet';
import { useSelector } from 'react-redux';

interface IState {
  userProfileReducer: IUserProfileState;
  activeWalletReducer: IActiveWalletAddressState;
  activeQiWalletReducer: IActiveQiWalletAddressState;
}

export const ReceiveAmountInputScreen: React.FC<
  ReceiveStackScreenProps<'ReceiveAmountInput'>
> = ({ navigation }) => {
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);
  const profilePicture = useSelector(
    (state: IState) => state.userProfileReducer.userAvatar,
  )
  const username = useSelector(
    (state: IState) => state.userProfileReducer.userName,
  );
  const activeAddress = useSelector(
    (state: IState) => state.activeWalletReducer.activeWalletAddress,
  );
  const activePaymentCode = useSelector(
    (state: IState) => state.activeQiWalletReducer.activeQiWalletPaymentCode,
  );
  const INITIAL_AMOUNT = '0';
  const [inputCurrency, setInputCurrency] = useState<Currency>(Currency.QUAI);
  const [activeCurrency, setActiveCurrency] = useState<Currency>(Currency.QUAI);
  const [inactiveCurrency, setInactiveCurrency] = useState<Currency>(Currency.QI);
  const [displayAddress, setDisplayAddress] = useState('');
  const [inputValue, setInputValue] = useState<string>(INITIAL_AMOUNT);

  useEffect(() => {
    if(activeAddress && inputCurrency === Currency.QUAI){
      setDisplayAddress(activeAddress)
    }
    if(activePaymentCode && inputCurrency === Currency.QI)
      {
        setDisplayAddress(activePaymentCode)
      }
  },[activeAddress,activePaymentCode]);

  function onInputButtonPress(newChar: string) {

    // Check for empty value
    if(inputValue.startsWith('0') && !inputValue.includes('.')){
      console.log('input value starts with 0');
      return setInputValue(newChar);
    }

    return setInputValue(inputValue + newChar);
  }

  function onDecimalButtonPress() {
    // Default to dot (.) as the decimal comma
    return !inputValue.includes('.') && setInputValue(inputValue + '.');
  }

  function onDeleteButtonPress() {

    return setInputValue(
      inputValue.length > 1 ? inputValue.slice(0, -1) : INITIAL_AMOUNT,
    );
  }

  const swapCurrency = () => {
    if(activeCurrency === Currency.QUAI){
      setActiveCurrency(Currency.QI);
      setInactiveCurrency(Currency.QUAI);
      setInputCurrency(Currency.QI)
      if(activePaymentCode)
      setDisplayAddress(activePaymentCode);
    }
    else{
    setActiveCurrency(Currency.QUAI);
    setInactiveCurrency(Currency.QI);
    setInputCurrency(Currency.QUAI);
    if(activeAddress)
      setDisplayAddress(activeAddress)
  };
  }

  const goToGeneratedQR = () =>
    {
    console.log(inputCurrency);
    console.log(inputValue);
    navigation.navigate('ReceiveQR', {
      amount: Number(inputValue),
      currency: inputCurrency
    });
  };

  return (
    <ContentComponent title={t('common.request')}>
      <View style={styles.separator} />
      <View style={styles.nameAndPFPContainer}>
        <AvatarComponent
          containerStyle={styles.image}
          iconSize={60}
          profilePicture={profilePicture ?? ''}
        />
        <TextComponent type="H3" style={styles.username}>
          {username}
        </TextComponent>
        <TextComponent>{abbreviateAddress(displayAddress)}</TextComponent>
      </View>
      <View style={styles.inputDisplayContainer}>
        <AmountDisplay
          suffix={` ${inputCurrency}`}
          value={inputValue}
        />
        <TouchableOpacity onPress={swapCurrency} style={styles.currencySwap}>
        <TextComponent type="H1" style={styles.inactiveCurrency}>{` / ${inactiveCurrency}`}</TextComponent>
        </TouchableOpacity>
      </View>
      <ButtonComponent
        disabled={Number(inputValue) === 0}
        onPress={goToGeneratedQR}
        style={styles.continueButton}
        title={t('common.continue')}
      />
      <View style={styles.separator} />
      <KeyboardComponent
        handleLeftButtonPress={onDecimalButtonPress}
        handleRightButtonPress={onDeleteButtonPress}
        onInputButtonPress={onInputButtonPress}
      />
    </ContentComponent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      marginTop: 10,
    },
    swapButton: {
      borderColor: theme.border,
      paddingVertical: 6,
    },
    swapButtonContainer: {
      width: 75,
    },
    swapIcon: {
      color: theme.primary,
    },
    continueButton: {
      marginTop: 40,
      marginHorizontal: 16,
      marginBottom: 8,
    },
    inputDisplayContainer: {
      marginTop: 16,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignContent: 'flex-end',
    },
    inactiveCurrency: {
      color: theme.secondary,
    },
    currencySwap: {
      alignContent: 'flex-end',
      justifyContent: 'center',
      paddingRight: 30,
    },
    image: {
      marginBottom: 0,
    },
    nameAndPFPContainer: {
      marginTop: 12,
      alignItems: 'center',
    },
    username: {
      marginTop: 8,
    },
    separator: {
      flex: 1,
    },
  });
