import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  ButtonComponent,
  SettingsContent,
  TextComponent,
} from 'src/components';
import { RootNavigator } from 'src/navigation/utils';

export const Feedback = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.feedback.landing',
  });

  // TODO: update link
  const goToLearnMore = () =>
    Linking.openURL('https://docs.quai.network/use-quai/wallets');

  const goToSubmit = () =>
    RootNavigator.navigate('SettingsStack', { screen: 'SubmitFeedback' });

  return (
    <SettingsContent
      containerStyle={styles.container}
      title={t('helpAndFeedback')}
    >
      <View style={styles.questionsContainer}>
        <TextComponent style={styles.titleText} type="H3">
          {t('title')}
        </TextComponent>
        <TextComponent themeColor="secondary" style={styles.descriptionText}>
          {t('description')}
        </TextComponent>
        <TextComponent themeColor="secondary" type="bold">
          {t('firstQuestion')}
        </TextComponent>
        <TextComponent themeColor="secondary" style={styles.descriptionText}>
          {t('firstAnswer')}
        </TextComponent>
        <TextComponent themeColor="secondary" type="bold">
          {t('secondQuestion')}
        </TextComponent>
        <TextComponent themeColor="secondary" style={styles.descriptionText}>
          {t('secondAnswer')}
        </TextComponent>
        <TextComponent themeColor="secondary" type="bold">
          {t('thirdQuestion')}
        </TextComponent>
        <TextComponent themeColor="secondary" style={styles.descriptionText}>
          {t('thirdAnswer')}
        </TextComponent>
        <ButtonComponent
          style={[styles.button, styles.topButton]}
          title={t('contactSupport')}
          outlined
        />
        <ButtonComponent
          outlined
          onPress={goToSubmit}
          style={styles.button}
          title={t('submitFeedback')}
        />
      </View>
      <ButtonComponent
        underline
        type="secondary"
        titleType="default"
        title={t('learnMore')}
        onPress={goToLearnMore}
        style={styles.learnMore}
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
  questionsContainer: {
    width: '100%',
  },
  button: { padding: 0, height: 36 },
  topButton: { marginTop: 36, marginBottom: 8 },
  learnMore: {
    marginHorizontal: 24,
  },
});
