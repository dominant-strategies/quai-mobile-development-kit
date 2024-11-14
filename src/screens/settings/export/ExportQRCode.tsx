import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  ContentComponent,
  QRCodeComponent,
  TextComponent,
} from 'src/components';
import { Theme } from 'src/types';
import { useThemedStyle } from 'src/shared/hooks';
import { RootNavigator } from 'src/navigation/utils';

import { ExportStackScreenProps } from 'src/navigation/stacks/ExportStack';
import { IPrimaryWalletState } from 'src/store/models/reducers/wallet';


interface IState {
  primaryWalletReducer: IPrimaryWalletState;
}

export const ExportQRCodeScreen: React.FC<
  ExportStackScreenProps<'ExportQRCode'>
> = ({}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'export.qrCode' });
  const styles = useThemedStyle(themedStyle);
  const phrase = useSelector(
    (state: IState) => state.primaryWalletReducer.primaryWalletPhrase,
  );
  const goToSettings = () =>
    RootNavigator.navigate('Main', { screen: 'Settings' });

  return (
    <ContentComponent>
      <View style={styles.separator} />
      <View style={styles.cardContainer}>
        <TextComponent type="H1">{t('title')}</TextComponent>
        <TextComponent type="paragraph" themeColor="secondary">
          {t('description')}
        </TextComponent>
        {phrase ? (
          <QRCodeComponent
            containerStyle={styles.qrCodeContainer}
            value={JSON.stringify({
              seedPhrase: phrase,
            })}
          />
        ) : (
          <ActivityIndicator color={styles.loader.color} />
        )}
      </View>
      <TextComponent style={styles.underline} themeColor="secondary">
        {t('learnMore')}
      </TextComponent>
      <View style={styles.separator} />
      <Pressable
        onPress={goToSettings}
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.5 }]}
      >
        <TextComponent type="H3">{t('complete')}</TextComponent>
      </Pressable>
      <View style={styles.separator} />
    </ContentComponent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    cardContainer: {
      alignItems: 'center',
      marginHorizontal: 16,
      marginBottom: 20,
      padding: 32,
      gap: 4,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme.border,
    },
    button: {
      padding: 16,
      marginHorizontal: 30,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme.border,
    },
    qrCodeContainer: {
      marginTop: 20,
    },
    reviewButton: {
      marginBottom: 16,
    },
    separator: {
      flex: 1,
    },
    underline: {
      textDecorationLine: 'underline',
    },
    loader: {
      color: theme.secondary,
    },
  });
