import React, { useEffect, useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import BaselineError from 'src/assets/baselineError.svg';
import {
  ButtonComponent,
  ContentComponent,
  LoaderComponent,
  SeedPhraseLayoutDisplay,
  TextComponent,
  TextButton,
  seedPhraseLayoutDisplayWordThemedStyle,
} from 'src/components';
import { useThemedStyle } from 'src/shared/hooks';
import { Theme } from 'src/types';
import { typography } from 'src/styles';

import { OnboardingStackScreenProps } from 'src/navigation/stacks/OnboardingStack';

import { IGlobalState } from 'src/store/models/reducers/global';
import * as walletActions from 'src/store/actions/walletActions';
import * as userProfileActions from 'src/store/actions/userProfileActions';


const AMOUNT_OF_WORDS_IN_PHRASE = 12;

interface IState {
  globalReducer: IGlobalState;
}

const isWindowSmallerThanScreen =
  Dimensions.get('window').height < Dimensions.get('screen').height;

export const LoginSeedPhraseInputScreen: React.FC<
  OnboardingStackScreenProps<'LoginSeedPhraseInput'>
> = ({ navigation }) => {
  const { t } = useTranslation();
  const { word: wordStyle } = useThemedStyle(
    seedPhraseLayoutDisplayWordThemedStyle,
  );
  const styles = useThemedStyle(themedStyle);
  const [seedPhraseWords, setSeedPhraseWords] = useState<string[]>(
    Array(AMOUNT_OF_WORDS_IN_PHRASE).fill(''),
  );
  const [isPhraseValid, setIsPhraseValid] = useState(false);
  const [settingUpWallet, setSettingUpWallet] = useState(false);
  const dispatch = useDispatch();
  const activitySpinner = useSelector(
    (state: IState) => state.globalReducer.createNewWalletActivitySpinner,
  );

  useEffect(() => {
    setTimeout(() => {
      setSettingUpWallet(activitySpinner);
    }, 250);
  }, [activitySpinner]);

  const fetchClipboardPhrase = async () => {
    const phrase = await Clipboard.getString();
    changeWordOnPhrase(phrase, 0);
};
  const changeWordOnPhrase = (value: string, idx: number) => {
    const newPhraseCalculator = (prevState: string[]) => {
      const parsedValue = value.split(' ');
      if (parsedValue.length <= 1) {
        // Take element on idx and replace it with value
        prevState.splice(idx, 1, value);
        return prevState;
      } else if (parsedValue.length >= AMOUNT_OF_WORDS_IN_PHRASE) {
        // Replace whole phrase and stop at the end (omit rest if any)
        return parsedValue.splice(0, AMOUNT_OF_WORDS_IN_PHRASE);
      } else {
        // Paste from current until the end
        return prevState.map((word, n) => {
          const slicedId = (n - idx) % AMOUNT_OF_WORDS_IN_PHRASE;
          return parsedValue[slicedId] ? parsedValue[slicedId] : word;
        });
      }
    };
    const newValue = newPhraseCalculator(seedPhraseWords);
    setSeedPhraseWords(newValue);
    if(seedPhraseWords.length === AMOUNT_OF_WORDS_IN_PHRASE)
      {
        setIsPhraseValid(true);
      }
  };

  const onSuccessful = async () => {
    if (isPhraseValid) {
      let seedPhrase = seedPhraseWords.join(' ');
      setSettingUpWallet(true);
      dispatch(userProfileActions.setAgreedTerms(true));
      setTimeout(function(){
        dispatch(walletActions.recoverQuaiHDWallet(seedPhrase));
      },500);
    }
  };

  if (settingUpWallet) {
    return <LoaderComponent text="Setting up wallet" />;
  }

  return (
    <ContentComponent containerStyle={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView alwaysBounceVertical={isWindowSmallerThanScreen}>
          <View style={styles.textContainer}>
            <TextComponent type="H1" style={styles.title}>
              {t('onboarding.login.phraseInput.title')}
            </TextComponent>
            <TextComponent type="paragraph" themeColor="secondary">
              {t('onboarding.login.phraseInput.description')}
            </TextComponent>
          </View>
          <View style={styles.bannerContainer}>
            <BaselineError />
            <TextComponent style={styles.bannerText}>
              {t('onboarding.login.phraseInput.bannerMsg')}
            </TextComponent>
          </View>
          <SeedPhraseLayoutDisplay showIndex>
            {seedPhraseWords.map((w, idx) => (
              <TextInput
                key={idx}
                style={[
                  typography.bold,
                  wordStyle,
                  styles.input,
                  styles.textInput,
                ]}
                defaultValue={w}
                onChangeText={value => changeWordOnPhrase(value, idx)}
              />
            ))}
          </SeedPhraseLayoutDisplay>
          <TextButton disabled={false} buttonLabel={'copy from clipboard'} handleButtonPress={fetchClipboardPhrase}/>
          <View style={styles.separator} />
          <ButtonComponent
            disabled={!isPhraseValid}
            title={t('common.continue')}
            onPress={onSuccessful}
            style={styles.continue}
          />
          <View style={styles.doubleSeparator} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ContentComponent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 40,
    },
    continue: {
      marginHorizontal: 20,
      marginBottom: 12,
    },
    input: {
      paddingBottom: 10,
    },
    textInput: {
      color: theme.primary,
    },
    title: {
      marginBottom: 8,
    },
    textContainer: {
      alignItems: 'center',
      marginHorizontal: 48,
    },
    bannerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surfaceVariant,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginVertical: 16,
      marginHorizontal: 58,
      borderWidth: 1,
      borderColor: theme.normal,
      borderRadius: 4,
      gap: 4,
    },
    bannerText: {
      maxWidth: '90%',
    },
    separator: {
      height: 40,
    },
    doubleSeparator: {
      height: 80,
    },
  });
