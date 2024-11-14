import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { fontStyle, styledColors } from 'src/styles';
import { abbreviateAddress } from 'src/quai-mdk/addressUtils';
import { Currency } from 'src/types';
import {
  ContentComponent,
  KeyboardComponent,
  TextComponent,
} from 'src/components';

import { SendStackParamList } from 'src/navigation/stacks/SendStack';
import { useAmountInput } from 'src/shared/hooks';
import { TipButton } from 'src/components/Buttons/TipButton';

type SendTipScreenProps = NativeStackScreenProps<SendStackParamList, 'SendTip'>;

const SendTipScreen = ({ route, navigation }: SendTipScreenProps) => {
  const { receiverAddress, receiverUsername, input } =
    route.params;
  const { t } = useTranslation();

  const [selectedTip, setSelectedTip] = useState<any>(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const { keyboard, input: tipInput } = useAmountInput(undefined, 1);

  const handleTipPress = (tipPercentage: any) => {
    if (tipPercentage === 'custom') {
      setKeyboardVisible(true);
    } else {
      setKeyboardVisible(false);
    }
    if (tipPercentage === 'custom') {
      setSelectedTip(selectedTip === 'custom' ? null : 'custom');
    } else {
      setSelectedTip(tipPercentage);
    }
  };

  const calculateTipAmount = (_amount: number, tipPercentage: number) => {
    let tips: any = {};

    if (tipPercentage === 0) {
      return {
        tipAmount: 0,
        message: t('home.send.noTip'),
        total: Number(input.value),
      };
    }

    if (isNaN(tipPercentage)) {
      tips = {
        customTip: tipInput,
        message: `${parseFloat(tipInput.value)} ${input.unit} ${t(
                'home.send.tip',
              )}`,
        total: Number(input.value) + parseFloat(tipInput.value),
      };
    } else {
      const tipAmount = (Number(input.value) * tipPercentage) / 100;
      tips = {
        tipAmount,
        message:`${parseFloat(Number(tipAmount).toFixed(6))} ${input.unit} ${t(
                'home.send.tip',
              )}`,
        total: Number(input.value) + Number(tipAmount),
      };
    }

    return tips;
  };

  const isButtonSelected = (tipPercentage: any) => {
    return selectedTip === tipPercentage;
  };

  const navigateToOverview = () => {
      navigation.navigate('SendOverview', {
        ...route.params,
        totalAmount: calculateTipAmount(
          Number(input.value),
          Number(selectedTip === 'custom' ? tipInput.value : selectedTip),
        ).total.toString(),
        tip: selectedTip,
      });
  };

  const handleCustomTip = () => {
    if (selectedTip === 'custom') {
      return `${Number(tipInput.value)} ${input.unit} ${t('home.send.tip')}`;
    } else {
      return calculateTipAmount(Number(input.value), Number(selectedTip))
        .message;
    }
  };

  const renderEquivalentAmount = () => {
    return input.unit === Currency.USD
      ? `${input.value} + ${handleCustomTip()}`
      : `${input.value} ${input.unit} + ${handleCustomTip()}`;
  };

  const showKeyboard = useCallback(() => {
    setKeyboardVisible(true);
  }, []);

  const hideKeyboard = useCallback(() => {
    setKeyboardVisible(false);
  }, []);

  return (
    <ContentComponent title={t('home.send.label')}>
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <TextComponent style={styles.username}>
              {t('common:to')} {receiverUsername}
            </TextComponent>
            <TextComponent themeColor="secondary">
              {abbreviateAddress(receiverAddress)}
            </TextComponent>
          </View>
          <TextComponent style={styles.tipText}>
            {t('home.send.includeTip')}
          </TextComponent>
          <View style={styles.amountContainer}>
            <View style={styles.balanceContainer}>
              <TextComponent type="H1">
                
                {calculateTipAmount(
                  Number(input.value),
                  Number(selectedTip),
                ).total.toString()}
              </TextComponent>
              <TextComponent type="H1" themeColor="secondary">
                {` ${input.unit}`}
              </TextComponent>
            </View>
            <TextComponent type="paragraph">
              {renderEquivalentAmount()}
            </TextComponent>
          </View>
          <View style={styles.container}>
            <TipButton
              isButtonSelected={isButtonSelected(0)}
              handleTipPress={() => handleTipPress(0)}
              buttonText={t('home.send.noTip')}
            />
            <TipButton
              isButtonSelected={isButtonSelected(10)}
              handleTipPress={() => handleTipPress(10)}
              buttonText={`10% ${
                calculateTipAmount(Number(input.value), 10).message
              }`}
            />
            <TipButton
              isButtonSelected={isButtonSelected(15)}
              handleTipPress={() => handleTipPress(15)}
              buttonText={`15% ${
                calculateTipAmount(Number(input.value), 15).message
              }`}
            />
            <TipButton
              isButtonSelected={isButtonSelected(20)}
              handleTipPress={() => handleTipPress(20)}
              buttonText={`20% ${
                calculateTipAmount(Number(input.value), 20).message
              }`}
            />
            <TipButton
              isButtonSelected={isButtonSelected(25)}
              handleTipPress={() => handleTipPress(25)}
              buttonText={`25% ${
                calculateTipAmount(Number(input.value), 25).message
              }`}
            />
            <TipButton
              isButtonSelected={isButtonSelected('custom')}
              handleTipPress={() => handleTipPress('custom')}
              buttonText={t('home.send.customTip')}
            />
          </View>
          <TouchableOpacity
            disabled={false}
            onPress={navigateToOverview}
            style={[
              styles.button,
              styles.selectedButton,
              styles.continueButton,
            ]}
          >
            <TextComponent
              type="H3"
              style={{
                color: styledColors.white,
              }}
            >
              {t('common.continue')}
            </TextComponent>
          </TouchableOpacity>
          <View style={styles.keyboardContainer}>
            <TouchableWithoutFeedback onPress={showKeyboard}>
              <KeyboardComponent
                handleLeftButtonPress={keyboard.onDecimalButtonPress}
                handleRightButtonPress={keyboard.onDeleteButtonPress}
                onInputButtonPress={keyboard.onInputButtonPress}
                visible={keyboardVisible}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ContentComponent>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipText: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  balanceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  amountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: styledColors.border,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    paddingVertical: 16,
    maxHeight: 50,
  },
  selectedButton: {
    backgroundColor: styledColors.normal,
    alignSelf: 'center',
  },
  continueButton: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    maxHeight: 50,
    textAlign: 'center',
  },
  username: {
    ...fontStyle.fontH3,
    marginTop: 16,
    fontSize: 14,
  },
  keyboardContainer: {
    bottom: 0,
    position: 'absolute',
  },
});

export default SendTipScreen;
