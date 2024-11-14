import React from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import Logo from 'src/assets/logo.svg';
import {
  ButtonComponent,
  ContentComponent,
  TextComponent,
} from 'src/components';
import { useThemedStyle } from 'src/shared/hooks';
import { styledColors } from 'src/styles';
import { Theme } from 'src/types';

import { OnboardingStackScreenProps } from 'src/navigation/stacks/OnboardingStack';

export const OnboardingLandingScreen: React.FC<
  OnboardingStackScreenProps<'OnboardingLanding'>
> = ({ navigation }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.landing',
  });
  const styles = useThemedStyle(themedStyle);

  const goToRegionSelector = () => navigation.navigate('SetupLocation');
  const goToReferral = () => navigation.navigate('OnboardingReferralScan');
  const goToLogin = () => navigation.navigate('LoginLanding');

  return (
    <ContentComponent
      noNavButton
      style={styles.backgroundColor}
      containerStyle={styles.mainContainer}
    >
      <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} />
      <View style={styles.tripleSeparator} />
      <View style={styles.logoContainer}>
      <Image style={styles.logo} source={require('src/assets/mdkBrandLogo.png')} />
      </View>
      <View style={styles.separator} />
      <View style={styles.body}>
        <TextComponent type="H1" style={styles.text}>
          {t('title')}
        </TextComponent>
        <TextComponent type="H3" style={styles.text}>{t('description')}</TextComponent>
      </View>
      <View style={styles.buttonContainer}>
      <ButtonComponent
          type="secondary"
          bgColor="white"
          titleColor="normal"
          title={t('setupButton')}
          onPress={goToRegionSelector}
        />
        <ButtonComponent
          outlined
          type="secondary"
          titleColor="white"
          title={'Import / Recover Wallet'}
          onPress={goToLogin}
        />
        </View>
      <View style={styles.separator} />
    </ContentComponent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    backgroundColor: {
      backgroundColor: 'black',
    },
    mainContainer: {
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    buttonContainer: {
      marginTop: 100,
      width: '100%',
      paddingVertical: 20,
      gap: 24,
    },
    separator: {
      flex: 1,
      marginVertical: 1,
    },
    tripleSeparator: {
      flex: 3,
      marginVertical: 1,
    },
    logoContainer: {
      marginBottom: 10,
    },
    logo: {
    width: 250,
    height: 250,
    borderRadius: 15,
    },
    body: {
      gap: 18,
      width: '100%',
    },
    text: {
      textAlign: 'left',
      marginHorizontal: 8,
      color: styledColors.white,
    },
  });
