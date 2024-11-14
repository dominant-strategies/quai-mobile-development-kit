import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { Theme } from '../types';
import { styledColors } from '../styles';
import { TextComponent } from './TextComponent';

export enum CardSize {
  Small = 'small',
  Medium = 'medium',
}

type CardComponentProps = {
  currency: string;
  balance: string;
  address: string;
  size: CardSize;
  title: string;
  zone: string;
};

export const CardComponent: React.FC<CardComponentProps> = ({
  address,
  currency,
  balance,
  size,
  title,
  zone,
}) => {
  const styles = useThemedStyle(themedStyle);
  const height = size === CardSize.Small ? 165 : 285;

  return (
    <View style={[styles.wrapper, { height }]}>
      <View style={styles.textWrapper}>
        <View style={styles.titleWrapper}>
        <TextComponent style={styles.colorOverwrite} type="H3">
          {title}
        </TextComponent>
        </View>
        <View style={styles.amountWrapper}>
        <TextComponent style={styles.colorOverwrite} type="H1">
          {balance}&nbsp;{currency}
        </TextComponent>
        </View>
        <View style={styles.zoneWrapper}>
            <TextComponent style={[styles.bold, styles.colorOverwrite]}>
              {zone}
            </TextComponent>
        </View>
        <View style={styles.address}>
        <TextComponent type={'H3'} style={[styles.colorOverwrite]}>
            {address}
          </TextComponent>
        </View>
      </View>
      <Image style={styles.image} source={require('src/assets/mdk-small-logo.png')} />
    </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    address: {
      marginTop: 2,
    },
    bold: {
      fontWeight: '700',
    },
    colorOverwrite: {
      color: styledColors.white,
    },
    image: {
      height: 50,
      width: 50,
      padding: 2,
      resizeMode: 'contain',
      position: 'absolute',
      right: 15,
      top: 5,
      borderRadius: 10,
    },
    textWrapper: {
      alignItems: 'flex-start',
      marginTop: 10,
    },
    titleWrapper: {
    marginBottom: 15,
    },
    amountWrapper: {
    marginBottom: 15,
    },
    zoneWrapper: {
      marginBottom: 5,
    },
    wrapper: {
      width: Dimensions.get('window').width - 32,
      paddingTop: 16,
      paddingLeft: 20,
      paddingRight: 26,
      justifyContent: 'space-between',
      alignSelf: 'center',
      borderRadius: 16,
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'black',
    },
  });
