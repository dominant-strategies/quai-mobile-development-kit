import React from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import RightChevron from 'src/assets/rightChevron.svg';
import EditIcon from 'src/assets/edit.svg';
import PhoneWithQR from 'src/assets/phoneWithQR.svg';
import {
  ButtonComponent,
  ContentComponent,
  TextComponent,
} from 'src/components';
import { useThemedStyle } from 'src/shared/hooks';
import { Theme } from 'src/types';

import { OnboardingStackScreenProps } from 'src/navigation/stacks/OnboardingStack';

export const LoginLandingScreen: React.FC<
  OnboardingStackScreenProps<'LoginLanding'>
> = ({ navigation }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.login.landing',
  });
  const styles = useThemedStyle(themedStyle);

  const goToQRCodeScan = () => navigation.navigate('LoginQRCodeScan');
  const goToSeedPhraseInput = () => navigation.navigate('LoginSeedPhraseInput');
  // TODO: update to use the actual page
  const goToLearnMoreRecovery = () =>
    Linking.openURL('https://docs.quai.network/use-quai/wallets');


  return (
    <ContentComponent>
      <View style={styles.textContainer}>
        <TextComponent type="H1" style={styles.title}>
          {t('title')}
        </TextComponent>
        <TextComponent type="paragraph" themeColor="secondary">
          {t('description')}
        </TextComponent>
      </View>
      <View style={styles.separator} />
      <Pressable
        onPress={goToQRCodeScan}
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.5 }]}
      >
        <PhoneWithQR />
        <View style={styles.cardTextContainer}>
          <TextComponent type="H3" style={styles.cardText}>
            {t('cards.qr.title')}
          </TextComponent>
          <TextComponent themeColor="secondary" style={styles.cardText}>
            {t('cards.qr.description')}
          </TextComponent>
        </View>
        <RightChevron />
      </Pressable>
      <Pressable
        onPress={goToSeedPhraseInput}
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.5 }]}
      >
        <EditIcon />
        <View style={styles.cardTextContainer}>
          <TextComponent type="H3" style={styles.cardText}>
            {t('cards.phrase.title')}
          </TextComponent>
          <TextComponent themeColor="secondary" style={styles.cardText}>
            {t('cards.phrase.description')}
          </TextComponent>
        </View>
        <RightChevron />
      </Pressable>
      <View style={styles.doubleSeparator} />
      <ButtonComponent
        underline
        type="secondary"
        titleType="default"
        title={t('learnMore')}
        onPress={goToLearnMoreRecovery}
        style={styles.learnMore}
      />
    </ContentComponent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    title: {
      marginBottom: 8,
    },
    textContainer: {
      alignItems: 'center',
      marginHorizontal: 48,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surfaceVariant,
      marginBottom: 12,
      paddingVertical: 40,
      marginHorizontal: 24,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    cardTextContainer: {
      flexShrink: 1,
      marginRight: 'auto',
      paddingHorizontal: 16,
    },
    cardText: {
      textAlign: 'left',
    },
    learnMore: {
      marginBottom: 70,
      paddingVertical: 10,
      marginHorizontal: 24,
    },
    separator: {
      flex: 1,
    },
    doubleSeparator: {
      flex: 2,
    },
  });
