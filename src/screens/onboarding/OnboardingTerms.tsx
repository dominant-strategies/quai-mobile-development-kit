import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import CheckBold from 'src/assets/checkBold.svg';
import {
  ButtonComponent,
  ContentComponent,
  LoaderComponent,
  TextComponent,
} from 'src/components';

import { useThemedStyle } from 'src/shared/hooks';
import { Theme} from 'src/types';

import { OnboardingStackScreenProps } from 'src/navigation/stacks/OnboardingStack';

import { useDispatch, useSelector } from 'react-redux';
import * as userProfileActions from 'src/store/actions/userProfileActions';
import * as walletActions from 'src/store/actions/walletActions';
import { IUserProfileState } from 'src/store/models/reducers/userProfile';
import { IPrimaryWalletState } from 'src/store/models/reducers/wallet';
import { IGlobalState } from 'src/store/models/reducers/global';

interface IState {
  userProfileReducer: IUserProfileState;
  primaryWalletReducer: IPrimaryWalletState;
  globalReducer: IGlobalState;
}
export const OnboardingTerms: React.FC<
  OnboardingStackScreenProps<'OnboardingTerms'>
> = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.terms',
  });
  const { t: tCommon } = useTranslation('translation', { keyPrefix: 'common' });
  const styles = useThemedStyle(themedStyle);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [settingUpWallet, setSettingUpWallet] = useState(false);
  const activitySpinner = useSelector(
    (state: IState) => state.globalReducer.createNewWalletActivitySpinner,
  );
  const toggleTerms = () => setTermsAccepted(prevState => !prevState);
  
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setSettingUpWallet(false);
    }, 250);
  }, [activitySpinner]);

  const onContinue = () => {
    setSettingUpWallet(true);
    dispatch(userProfileActions.setAgreedTerms(true));
    setTimeout(function(){
      dispatch(walletActions.createNewQuaiHDWallet());
    },500);
  }
 

  if (settingUpWallet) {
    return <LoaderComponent text="Setting up wallet" />;
  }

  return (
    <ContentComponent containerStyle={styles.container}>
      <TextComponent type="H1">{t('title')}</TextComponent>
      <View style={styles.separator} />
      <ScrollView>
        <TextComponent type="bold" style={styles.terms}>
          {t('termsAndConditions')}
        </TextComponent>
        <TextComponent style={styles.terms}>{t('termsContent')}</TextComponent>
      </ScrollView>
      <Pressable onPress={toggleTerms} style={styles.agree}>
        <View style={styles.checkBoldContainer}>
          {termsAccepted ? (
            <CheckBold />
          ) : (
            <View style={styles.checkBoldBlank} />
          )}
        </View>
        <TextComponent style={styles.agreeText}>{t('agree')}</TextComponent>
      </Pressable>
      <ButtonComponent
        disabled={!termsAccepted}
        title={tCommon('continue')}
        onPress={onContinue}
      />
      <View style={styles.doubleSeparator} />
    </ContentComponent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    terms: {
      textAlign: 'left',
      paddingHorizontal: 10,
    },
    agree: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      gap: 16,
      marginBottom: 24,
    },
    agreeText: {
      flexShrink: 1,
      textAlign: 'left',
      fontSize: 15,
    },
    checkBoldContainer: {
      borderWidth: 1,
      borderColor: theme.border,
    },
    checkBoldBlank: {
      height: 24,
      width: 24,
    },
    separator: {
      marginVertical: 4,
      flex: 1,
    },
    doubleSeparator: {
      marginVertical: 4,
      flex: 2,
    },
  });
