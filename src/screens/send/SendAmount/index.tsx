import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import {
  ButtonComponent,
  ContentComponent,
  AmountDisplay,
  KeyboardComponent,
  TextComponent,
  AvatarComponent,
} from 'src/components';
import Eye from 'src/assets/eyeOutline.svg';
import EyeClosed from 'src/assets/hide.svg';
import { useAmountInput } from 'src/shared/hooks';
import { abbreviateAddress } from 'src/quai-mdk/addressUtils';
import { Currency } from 'src/types';
import { fontStyle, styledColors } from 'src/styles';
import { SendStackParamList } from 'src/navigation/stacks/SendStack';
import {TextButton} from 'src/components/Buttons/textButton';
import { IUserProfileState } from 'src/store/models/reducers/userProfile';
import { IActiveQiWalletAddressState, IActiveWalletAddressState } from 'src/store/models/reducers/wallet';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

type SendAmountScreenProps = NativeStackScreenProps<
  SendStackParamList,
  'SendAmount'
>;

interface IState {
  userProfileReducer: IUserProfileState;
  activeWalletReducer: IActiveWalletAddressState;
  activeQiWalletReducer: IActiveQiWalletAddressState;
}

const SendAmountScreen = ({ route, navigation }: SendAmountScreenProps) => {
  const { amount, currency, quaiAddress, qiPaymentCode, receiverUsername, receiverPFP, sender } =
    route.params;
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';
  const [balance, setBalance] = React.useState(0);
  const [displayAddress, setDisplayAddress] = React.useState('');
  const [hideBalance, setHideBalance] = React.useState(false);
  const inputRef = useRef<TextInput>(null);
  const activeAddress = useSelector(
    (state: IState) => state.activeWalletReducer.activeWalletAddress,
  );
  const activeQiWalletPaymentCode = useSelector(
    (state: IState) => state.activeQiWalletReducer.activeQiWalletPaymentCode,
  );

  const activeAddressBalance = useSelector(
    (state: IState) => state.activeWalletReducer.activeWalletAddressBalance,
  );

  const activeQiAddressBalance = useSelector(
    (state: IState) => state.activeQiWalletReducer.activeQiWalletAddressBalance,
  );

  const equivalentUnitTextColorStyle = {
    color: isDarkMode ? styledColors.gray : styledColors.black,
  };

  const INITIAL_AMOUNT = '0';
  const INITIAL_CURRENCY: Currency = Currency.QUAI;

  const [inputValue, setInputValue] = useState<string>(INITIAL_AMOUNT);
  const [inputCurrency, setInputCurrency] = useState<Currency>(INITIAL_CURRENCY);

  const shouldDisableContinueButtons = Number(inputValue) === 0;

  function onInputButtonPress(newChar: string) {

    // Check for empty value
    if(inputValue.startsWith('0') && !inputValue.includes('.')){
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

  const goToTip = () => {
    const amount = inputValue.toString();
    if (!inputValue) {
      // TODO: show friendly error message
      return;
    }
    if (Number(amount) > balance) {
      // TODO: show friendly error message
      // return;
    }
    const input = {
      unit: inputCurrency,
      value: inputValue,
    }
    let receiverAddress = '';
    let sender = '';
    if(currency === Currency.QUAI)
      {
      receiverAddress = quaiAddress;
      if(activeAddress){
      sender = activeAddress;  
      }
    }
    if(currency === Currency.QI)
      {
      receiverAddress = qiPaymentCode;
      if(activeQiWalletPaymentCode){
        sender = activeQiWalletPaymentCode;  
        }
      }
    navigation.navigate('SendTip', {
    sender,
    receiverAddress,
    receiverUsername,
    input,
    });
  };

  const goToOverview = () => {
    if (!inputValue) {
      // TODO: show friendly error message
      return;
    }
    if (Number(inputValue) > balance) {
      // TODO: show friendly error message
      // return;
    }

    const input = {
      unit: inputCurrency,
      value: inputValue.toString(),
    }
    
    let receiverAddress = '';
    let sender = '';
    if(currency === Currency.QUAI)
      {
      receiverAddress = quaiAddress;
      if(activeAddress){
      sender = activeAddress;  
      }
    }
    if(currency === Currency.QI)
      {
      receiverAddress = qiPaymentCode;
      if(activeQiWalletPaymentCode){
        sender = activeQiWalletPaymentCode;  
        }
      }

    navigation.navigate('SendOverview', {
      sender,
      input,
      receiverAddress,
      receiverPFP,
      receiverUsername,
      totalAmount: input.value,
      tip: 0,
    });
  };
  useEffect(() => {
    if (currency === 'QUAI') {
      setInputCurrency(Currency.QUAI);
      if(activeAddressBalance)
        setBalance(Number(activeAddressBalance));
      setDisplayAddress(quaiAddress);
    }
    else{
      setInputCurrency(Currency.QI);
      if(activeQiAddressBalance)
        setBalance(Number(activeQiAddressBalance));
      setDisplayAddress(qiPaymentCode);
    }
    setInputValue(amount.toString())
  }, [isFocused]);

  const getBalance = () => {
    if (currency === Currency.QUAI){
      return activeAddressBalance;
    }
    if (currency === Currency.QI){
      return activeQiAddressBalance.toFixed(2);
    }
  }


  useLayoutEffect(() => {
    if (inputRef && !amount) {
      inputRef.current?.focus();
    }
  }, [inputRef]);

  return (
    <ContentComponent title={t('home.send.label')}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.container}>
        <AvatarComponent
          containerStyle={styles.image}
          iconSize={60}
          profilePicture={receiverPFP ?? ''}
        />
          <TextComponent type="H3" style={styles.receiver}>
            {t('common.to')} {receiverUsername}
          </TextComponent>
          <TextComponent style={styles.wallet}>
            {abbreviateAddress(displayAddress)}
          </TextComponent>
        </View>
        <View>
          <View style={styles.balanceContainer}>
            <Text
              style={{
                color: styledColors.normal,
              }}
            >
              {t('home.send.yourBalance')}
              {hideBalance ? 'X.XX' : getBalance()} {currency.toString()}
            </Text>
            <TouchableOpacity
              onPress={() => setHideBalance(!hideBalance)}
              style={styles.balanceIcon}
            >
              {hideBalance ? <EyeClosed /> : <Eye />}
            </TouchableOpacity>
          </View>
          <View style={[styles.row, styles.marginTop16]}>
            <AmountDisplay
              value={inputValue}
              suffix={`  ${inputCurrency}`}
            />
          </View>
          <View style={styles.inputBorder} />
        </View>
        <View style={styles.buttons}>
           <TextButton disabled={false} buttonLabel={t('home.send.includeTip')}
      handleButtonPress={goToTip}
      />
          <ButtonComponent
            onPress={goToOverview}
            style={styles.continueButton}
            disabled={shouldDisableContinueButtons}
            title={t('common.continue')}
          />
        </View>
      </ScrollView>
      {!amount && (
        <View style={styles.keyboardContainer}>
          <KeyboardComponent
            handleLeftButtonPress={onDecimalButtonPress}
            handleRightButtonPress={onDeleteButtonPress}
            onInputButtonPress={onInputButtonPress}
          />
        </View>
      )}
    </ContentComponent>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    justifyContent: 'flex-end',
  },
  scrollView: {
    flex: 1,
    paddingVertical: 28,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 16,
    paddingTop: 24,
  },
  exchangeUnit: {
    width: 90,
    height: 24,
    borderRadius: 42,
    borderWidth: 1,
    borderColor: styledColors.border,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    marginLeft: 8,
    marginTop: 10,
  },
  amountUnit: {
    marginTop: 10,
  },
  inputBorder: {
    backgroundColor: styledColors.normal,
    width: '60%',
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
  },
  balanceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    flexDirection: 'row',
  },
  balanceIcon: {
    marginLeft: 8,
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
    marginBottom: 48,
    height: 145,
  },
  continueButton: {
    alignSelf: 'center',
    paddingVertical: 16,
    width: '80%',
  },
  tipButton: {
    borderRadius: 5,
    borderWidth: 1,
    alignSelf: 'center',
    paddingVertical: 16,
    width: '80%',
    alignItems: 'center',
    maxHeight: 48,
    marginBottom: 12,
  },
  marginTop16: {
    marginTop: 16,
    alignSelf: 'center',
  },
  image: {
    borderRadius: 70,
    height: 60,
    width: 60,
  },
  container: {
    alignItems: 'center',
  },
  receiver: {
    marginVertical: 4,
    fontSize: 16,
  },
  wallet: {
    ...fontStyle.fontH2,
  },
});

export default SendAmountScreen;
