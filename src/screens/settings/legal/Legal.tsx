import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { SettingsContent, TextComponent } from 'src/components';
import { useThemedStyle } from 'src/shared/hooks';
import { Theme } from 'src/types';

export const Legal = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.legal',
  });
  const styles = useThemedStyle(themedStyle);

  return (
    <SettingsContent title={t('legal')}>
      <ScrollView contentContainerStyle={styles.container}>
        <TextComponent type="H3">{t('title')}</TextComponent>
        <TextComponent themeColor="secondary" style={styles.descriptionText}>
          {t('description')}
        </TextComponent>
        <TextComponent themeColor="secondary" type="bold">
          {t('firstPoint')}
        </TextComponent>
        <TextComponent themeColor="secondary" style={styles.descriptionText}>
          {t('firstPointDescription')}
        </TextComponent>
        <TextComponent themeColor="secondary" type="bold">
          {t('secondPoint')}
        </TextComponent>
        <TextComponent themeColor="secondary" style={styles.descriptionText}>
          {t('secondPointDescription')}
        </TextComponent>
        <TextComponent themeColor="secondary" type="bold">
          {t('thirdPoint')}
        </TextComponent>
        <TextComponent themeColor="secondary" style={styles.descriptionText}>
          {t('thirdPointDescription')}
        </TextComponent>
        <TextComponent themeColor="secondary" type="bold">
          {t('fourthPoint')}
        </TextComponent>
        <TextComponent themeColor="secondary" style={styles.descriptionText}>
          {t('fourthPointDescription')}
        </TextComponent>
        <TextComponent themeColor="secondary" type="bold">
          {t('fifthPoint')}
        </TextComponent>
        <TextComponent themeColor="secondary" style={styles.descriptionText}>
          {t('fifthPointDescription')}
        </TextComponent>
        <TextComponent themeColor="secondary" type="bold">
          {t('sixthPoint')}
        </TextComponent>
        <TextComponent themeColor="secondary" style={styles.descriptionText}>
          {t('sixthPointDescription')}
        </TextComponent>
        <TextComponent themeColor="secondary" type="bold">
          {t('seventhPoint')}
        </TextComponent>
        <TextComponent themeColor="secondary" style={styles.descriptionText}>
          {t('seventhPointDescription')}
        </TextComponent>
      </ScrollView>
    </SettingsContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'flex-start',
      padding: 16,
    },
    descriptionText: {
      textAlign: 'left',
      marginBottom: 16,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.normal,
      borderRadius: 4,
      borderWidth: 1,
    },
  });
