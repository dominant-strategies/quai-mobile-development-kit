import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  ButtonComponent,
  SettingsContent,
  TextComponent,
} from 'src/components';
import Upload from 'src/assets/upload.svg';
import { styledColors } from 'src/styles';

export const Referral = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.referral',
  });
  return (
    <SettingsContent
      title={t('referral')}
      containerStyle={styles.container}
    >
      <View>
        <TextComponent style={styles.titleText} type="H3">
          {t('title')}
        </TextComponent>
        <TextComponent themeColor="secondary" style={styles.descriptionText}>
          {t('description')}
        </TextComponent>
        <TextComponent themeColor="secondary" type="bold">
          {t('firstStep')}
        </TextComponent>
        <TextComponent themeColor="secondary" style={styles.descriptionText}>
          {t('firstStepDescription')}
        </TextComponent>
        <TextComponent themeColor="secondary" type="bold">
          {t('secondStep')}
        </TextComponent>
        <TextComponent themeColor="secondary" style={styles.descriptionText}>
          {t('secondStepDescription')}
        </TextComponent>
        <TextComponent themeColor="secondary" type="bold">
          {t('thirdStep')}
        </TextComponent>
        <TextComponent themeColor="secondary" style={styles.descriptionText}>
          {t('thirdStepDescription')}
        </TextComponent>
      </View>
      <ButtonComponent
        RightIcon={<Upload color={styledColors.normal} />}
        title={t('buttonText')}
        outlined
      />
    </SettingsContent>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 16,
  },
  titleText: {
    textAlign: 'left',
  },
  descriptionText: {
    textAlign: 'left',
    marginBottom: 16,
  },
});
