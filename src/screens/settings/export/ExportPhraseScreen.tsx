import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Clipboard from '@react-native-clipboard/clipboard';
import { useSelector } from 'react-redux';

import {
  ButtonComponent,
  ContentComponent,
  TextComponent,
} from 'src/components';
import BaselineError from 'src/assets/baselineError.svg';
import EyeOutline from 'src/assets/eyeOutline.svg';
import HideIcon from 'src/assets/hide.svg';
import CopyOutline from 'src/assets/copyOutline.svg';
import { Theme } from 'src/types';
import { useSnackBar } from 'src/shared/context/snackBarContext';
import { useThemedStyle } from 'src/shared/hooks';
import { styledColors } from 'src/styles';

import { SeedPhraseDisplay } from 'src/components/SeedPhraseDisplay';
import { ExportStackScreenProps } from 'src/navigation/stacks/ExportStack';
import { IPrimaryWalletState } from 'src/store/models/reducers/wallet';


const isWindowSmallerThanScreen =
  Dimensions.get('window').height < Dimensions.get('screen').height;

interface IState {
    primaryWalletReducer: IPrimaryWalletState;
  }

export const ExportPhraseScreen: React.FC<
  ExportStackScreenProps<'ExportPhrase'>
> = ({ navigation }) => {
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);
  const phrase = useSelector(
    (state: IState) => state.primaryWalletReducer.primaryWalletPhrase,
  );
  const { showSnackBar } = useSnackBar();

  const [seedPhrase, setSeedPhrase] = useState<string>();
  const [isSeedPhraseHidden, setIsSeedPhraseHidden] = useState(true);

  useEffect(() => {
    if (!seedPhrase) {
      setSeedPhrase(phrase);
    }
  }, [phrase, seedPhrase]);

  const toggleShowSeedPhrase = () =>
    setIsSeedPhraseHidden(prevState => !prevState);
  const copyToClipboard = () => {
    Clipboard.setString(seedPhrase ?? '');
    showSnackBar({
      message: 'Done',
      moreInfo: t('export.phrase.phraseCopied') ?? '',
      type: 'success',
    });
  };
  const goToConfirmPhrase = () =>
    seedPhrase &&
    navigation.navigate('ExportConfirmationPhrase', { seedPhrase });

  return (
    <ContentComponent>
      <ScrollView alwaysBounceVertical={isWindowSmallerThanScreen}>
        <View style={styles.textContainer}>
          <TextComponent type="H1" style={styles.title}>
            {t('export.phrase.title')}
          </TextComponent>
          <TextComponent type="paragraph" themeColor="secondary">
            {t('export.phrase.description')}
          </TextComponent>
        </View>
        <View style={styles.disclaimerContainer}>
          <BaselineError />
          <TextComponent allowFontScaling style={styles.disclaimerText}>
            {t('export.phrase.screenShotBanner')}
          </TextComponent>
        </View>
        <ButtonComponent
          title={
            isSeedPhraseHidden
              ? t('export.phrase.revealPhrase')
              : t('export.phrase.hidePhrase')
          }
          type="secondary"
          titleColor="gray"
          RightIcon={isSeedPhraseHidden ? <EyeOutline /> : <HideIcon />}
          onPress={toggleShowSeedPhrase}
          style={styles.revealButton}
        />
        {seedPhrase && (
          <SeedPhraseDisplay
            hide={isSeedPhraseHidden}
            seedPhrase={seedPhrase}
          />
        )}
        <View style={styles.separator} />
        <ButtonComponent
          type="secondary"
          title={t('export.phrase.copyToClipboard')}
          titleColor="gray"
          titleType="bold"
          outlined
          RightIcon={<CopyOutline />}
          onPress={copyToClipboard}
          style={styles.copyToClipboardButton}
        />
        <View style={styles.doubleSeparator} />
        <Pressable
          disabled={!seedPhrase}
          onPress={goToConfirmPhrase}
          style={({ pressed }) => [
            styles.continueButton,
            pressed && { opacity: 0.5 },
          ]}
        >
          <TextComponent style={styles.whiteColor}>
            {t('common.continue')}
          </TextComponent>
        </Pressable>
        <View style={styles.doubleSeparator} />
      </ScrollView>
    </ContentComponent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    textContainer: {
      alignItems: 'center',
      marginHorizontal: 48,
    },
    disclaimerContainer: {
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
    disclaimerText: {
      maxWidth: '90%', // To avoid text overflow in german
    },
    title: {
      marginBottom: 8,
    },
    revealButton: {
      alignSelf: 'center',
      marginBottom: 24,
    },
    copyToClipboardButton: {
      alignSelf: 'center',
      borderRadius: 4,
    },
    continueButton: {
      padding: 10,
      marginHorizontal: 30,
      backgroundColor: theme.normal,
    },
    separator: {
      height: 40,
    },
    doubleSeparator: {
      height: 80,
    },
    whiteColor: {
      color: styledColors.white,
    },
  });
