import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
  CameraComponent,
  ContentComponent,
  LoaderComponent,
  TextComponent,
  ScannerType,
  squareHoleSize,
} from 'src/components';

import { OnboardingStackScreenProps } from 'src/navigation/stacks/OnboardingStack';
import * as walletActions from 'src/store/actions/walletActions';
import * as userProfileActions from 'src/store/actions/userProfileActions';
import { IPrimaryWalletState } from 'src/store/models/reducers/wallet';

interface IState {
  primaryWalletReducer: IPrimaryWalletState;
}

export const LoginQRCodeScanScreen: React.FC<
  OnboardingStackScreenProps<'LoginQRCodeScan'>
> = ({}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.login.qrCodeScan',
  });
  const [loading, setLoading] = useState(false);

  const [settingUpWallet, setSettingUpWallet] = useState(false);
  const dispatch = useDispatch();
  const activitySpinner = useSelector(
    (state: IState) => state.primaryWalletReducer.createNewWalletActivitySpinner,
  );

 const toggleLoader = (loading: boolean) => {
  setLoading(loading);
 }

 useEffect(() => {
  setTimeout(() => {
    setSettingUpWallet(activitySpinner);
  }, 250);
}, [activitySpinner]);

 const recoverAccount =(seedPhrase: string) => {
  onSuccessfulScan(seedPhrase);
 }

 const onSuccessfulScan = async (seedPhrase: string) => {
    setSettingUpWallet(true);
    dispatch(userProfileActions.setAgreedTerms(true));
    setTimeout(function(){
      dispatch(walletActions.recoverQuaiHDWallet(seedPhrase));
    },500);
};



  return settingUpWallet ? (
    <LoaderComponent text="Setting up wallet" />
  ) : (
    <ContentComponent hasBackgroundVariant>
      <CameraComponent scanType={ScannerType.LOGIN_CODE} toggleLoader={toggleLoader}  recoverAccount={(seedPhrase) => recoverAccount(seedPhrase)}/>
      <TextComponent type="H1" style={[styles.textContainer, styles.title]}>
        {t('title')}
      </TextComponent>
      <TextComponent
        type="paragraph"
        themeColor="secondary"
        style={styles.description}
      >
        {t('description')}
      </TextComponent>
    </ContentComponent>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    marginHorizontal: 48,
  },
  title: {
    marginVertical: 20,
  },
  description: {
    top: 60 + squareHoleSize,
    marginTop: 48,
    marginHorizontal: 48,
  },
});
