import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, StyleSheet, Switch, View } from 'react-native';
import {
  ButtonComponent,
  SettingsContent,
  TextComponent,
} from 'src/components';
import { useTheme } from 'src/shared/context/themeContext';

export const Notifications = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.notifications',
  });
  const { theme } = useTheme();

  const [bankNotificationsEnabled, setBankNotificationsEnabled] =
    useState(false);
  const toggleBankSwitch = () =>
    setBankNotificationsEnabled(previousState => !previousState);
  const [paymentNotificationsEnabled, setPaymentNotificationsEnabled] =
    useState(false);
  const togglePaymentSwitch = () =>
    setPaymentNotificationsEnabled(previousState => !previousState);

  // TODO: update link
  const goToLearnMoreRecovery = () =>
    Linking.openURL('https://docs.quai.network/use-quai/wallets');

  return (
    <SettingsContent title={t('notifications')}>
      <View style={styles.container}>
        <View>
          <TextComponent style={styles.title} type="bold">
            {t('pushNotifications')}
          </TextComponent>
          <View style={styles.notificationContainer}>
            <View style={styles.notificationText}>
              <TextComponent type="H3">{t('bankTransfer')}</TextComponent>
              <TextComponent themeColor="secondary">
                {t('bankTransferDescription')}
              </TextComponent>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                trackColor={{ false: theme.background, true: theme.background }}
                thumbColor={
                  bankNotificationsEnabled ? theme.normal : theme.secondary
                }
                ios_backgroundColor={theme.background}
                onValueChange={toggleBankSwitch}
                value={bankNotificationsEnabled}
              />
              <TextComponent style={styles.switchText}>
                {bankNotificationsEnabled ? t('on') : t('off')}
              </TextComponent>
            </View>
          </View>
          <View style={styles.notificationContainer}>
            <View style={styles.notificationText}>
              <TextComponent type="H3">{t('paymentReceived')}</TextComponent>
              <TextComponent themeColor="secondary">
                {t('paymentReceivedDescription')}
              </TextComponent>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                trackColor={{ false: theme.background, true: theme.background }}
                thumbColor={
                  paymentNotificationsEnabled ? theme.normal : theme.secondary
                }
                ios_backgroundColor={theme.background}
                onValueChange={togglePaymentSwitch}
                value={paymentNotificationsEnabled}
              />
              <TextComponent style={styles.switchText}>
                {paymentNotificationsEnabled ? t('on') : t('off')}
              </TextComponent>
            </View>
          </View>
        </View>
        <ButtonComponent
          underline
          type="secondary"
          titleType="default"
          title={t('learnMore')}
          onPress={goToLearnMoreRecovery}
          style={styles.learnMore}
        />
      </View>
    </SettingsContent>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    padding: 16,
    justifyContent: 'space-between',
    height: '100%',
  },
  title: {
    fontSize: 16,
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    width: '100%',
  },
  notificationText: {
    alignItems: 'flex-start',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchText: {
    width: 32,
  },
  learnMore: {
    marginHorizontal: 24,
  },
});
