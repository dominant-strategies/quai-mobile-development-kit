import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  CameraComponent,
  ContentComponent,
  LoaderComponent,
  TextComponent,
  ScannerType,
  squareHoleSize,
} from 'src/components';

import { OnboardingStackScreenProps } from 'src/navigation/stacks/OnboardingStack';

export const OnboardingReferralScanScreen: React.FC<
  OnboardingStackScreenProps<'OnboardingReferralScan'>
> = ({}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.referralScan',
  });
  const [redirecting, setRedirecting] = useState(false);

  const toggleRedirectStatus = (redirect: boolean) => {
    setRedirecting(redirect)
  }

  return redirecting ? (
    <LoaderComponent text={t('redirecting')} />
  ) : (
    <ContentComponent hasBackgroundVariant>
      <CameraComponent scanType={ScannerType.REFERRAL_CODE} toggleRedirecting={toggleRedirectStatus} />
      <TextComponent type="H1" style={styles.title}>
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
  title: {
    alignItems: 'center',
    marginHorizontal: 48,
    marginVertical: 20,
  },
  description: {
    top: 60 + squareHoleSize,
    marginTop: 48,
    marginHorizontal: 48,
  },
});
