import React, { useState } from 'react';
import { StyleSheet, Switch, TextInput, View } from 'react-native';
import {
  ButtonComponent,
  SettingsContent,
  TextComponent,
} from 'src/components';
import { useTranslation } from 'react-i18next';
import { useThemedStyle } from 'src/shared/hooks';
import { Theme } from 'src/types';
import { useTheme } from 'src/shared/context/themeContext';

export const Submit = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.feedback.submit',
  });
  const styles = useThemedStyle(themedStyle);
  const { theme } = useTheme();

  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sendLogsEnabled, setSendLogsEnabled] = useState(false);
  const toggleSendLogs = () =>
    setSendLogsEnabled(previousState => !previousState);
  return (
    <SettingsContent
      containerStyle={styles.container}
      title={t('submitFeedback')}
    >
      <TextComponent style={styles.titleText} type="H3">
        {t('message')}
      </TextComponent>
      <TextInput
        multiline={true}
        onChangeText={setMessage}
        placeholder={t('messagePlaceholder') as string}
        placeholderTextColor={theme.secondary}
        style={[styles.messageInput, styles.multilineInput]}
        value={message}
      />
      <TextComponent style={styles.titleText} type="H3">
        {t('name')}
      </TextComponent>
      <TextInput
        onChangeText={setName}
        placeholder={t('name') as string}
        placeholderTextColor={theme.secondary}
        style={styles.messageInput}
        value={name}
      />
      <TextComponent style={styles.titleText} type="H3">
        {t('email')}
      </TextComponent>
      <TextInput
        onChangeText={setEmail}
        placeholder={t('email') as string}
        placeholderTextColor={theme.secondary}
        style={styles.messageInput}
        value={email}
      />
      <View style={styles.logSwitch}>
        <Switch
          trackColor={{ false: theme.background, true: theme.background }}
          thumbColor={sendLogsEnabled ? theme.normal : theme.secondary}
          ios_backgroundColor={theme.background}
          onValueChange={toggleSendLogs}
          value={sendLogsEnabled}
        />
        <TextComponent style={styles.logText}>{t('attachLogs')}</TextComponent>
      </View>
      <TextComponent style={styles.logDescription} themeColor="secondary">
        {t('logsExplanation')}
      </TextComponent>
      <ButtonComponent
        style={styles.button}
        title={t('submitFeedback')}
        outlined
      />
    </SettingsContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'flex-start',
      width: '100%',
      padding: 16,
    },
    titleText: {
      marginVertical: 8,
    },
    messageInput: {
      borderColor: theme.border,
      borderRadius: 4,
      borderWidth: 1,
      padding: 8,
      width: '100%',
      color: theme.primary,
    },
    multilineInput: {
      height: 182,
    },
    button: { padding: 0, height: 36 },
    logSwitch: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 14,
      marginBottom: 5,
    },
    logText: {
      fontSize: 14,
      marginLeft: 12,
    },
    logDescription: {
      textAlign: 'left',
      marginBottom: 16,
    },
  });
