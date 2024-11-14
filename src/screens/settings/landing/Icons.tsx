import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import PiggyBank from 'src/assets/piggyBank.svg';
import { TextComponent } from 'src/components';
import Card from 'src/assets/card.svg';
import Send from 'src/assets/send.svg';
import Receive from 'src/assets/receive.svg';
import Account from 'src/assets/account.svg';

import { useThemedStyle } from 'src/shared/hooks';
import { Theme } from 'src/types';

export const Icons = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.landing',
  });
  const styles = useThemedStyle(themedStyle);

  return (
    <View style={styles.wrapper}>
      <View style={styles.iconText}>
        <View style={styles.icon}>
          <PiggyBank />
        </View>
        <TextComponent>{t('invest')}</TextComponent>
      </View>
      <View style={styles.iconText}>
        <View style={styles.icon}>
          <Card />
        </View>
        <TextComponent>{t('payment')}</TextComponent>
      </View>
      <View style={styles.iconText}>
        <View style={styles.icon}>
          <Send />
        </View>
        <TextComponent>{t('send')}</TextComponent>
      </View>
      <View style={styles.iconText}>
        <View style={styles.icon}>
          <Receive />
        </View>
        <TextComponent>{t('receive')}</TextComponent>
      </View>
      <View style={styles.iconText}>
        <View style={styles.icon}>
          <Account />
        </View>
        <TextComponent>{t('account')}</TextComponent>
      </View>
    </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    icon: {
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.border,
      borderWidth: 1,
      width: 48,
      height: 48,
      borderRadius: 24,
    },
    iconText: {
      justifyContent: 'center',
    },
    wrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30,
      marginBottom: 20,
    },
  });
