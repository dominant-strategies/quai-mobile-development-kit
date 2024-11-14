import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useThemedStyle } from 'src/shared/hooks';
import { Theme } from '../types';
import { TextComponent } from './TextComponent';
import { styledColors } from '../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';
import { utils } from 'web3';
import { shortAddress } from '../quai-mdk/utils';

type ListItemComponentProps = {
  picture: string | React.ReactNode;
  date?: string;
  quaiAmount?: string;
  address?: string;
  txDirection?: string;
  thisWallet?: string;
  from: string;
  to: string;
};

export const ListItemComponent: React.FC<ListItemComponentProps> = ({
  picture,
  date,
  quaiAmount,
  address,
  txDirection,
  thisWallet,
  from,
  to,
}) => {
  const styles = useThemedStyle(themedStyle);
  const getAddressForTxType = () => {
    if(txDirection === 'received'){
      return shortAddress(from);
    }
    if(txDirection === 'sent'){
      return shortAddress(to);
    }
    if(txDirection === 'transfer'){
      return shortAddress(to);
    }
  }

  const clipAmount = (amount:string | undefined) => {
    if(amount){
    return Number(amount).toFixed(6).toString();
    }
    else return ("0.00")
  }

  const copyAddress = () => {
    let copyString = '';
    if(txDirection === 'received'){
      copyString = from;
    }
    if(txDirection === 'sent'){
      copyString = to;
    }
    const toLC = copyString.toLowerCase();
    const csAddress = utils.toChecksumAddress(toLC);
    console.log('to Checksum', copyString, csAddress)
    Clipboard.setString(csAddress);
  }
  return (
    <View style={styles.container}>
      <View style={styles.leftBlock}>
      {typeof picture === 'string' ? (
        <Image source={{ uri: picture }} style={styles.image} />
      ) : (
        <View style={styles.image}>{picture}</View>
      )}
      </View>
      <View style={styles.centreBlock}>
      <TouchableOpacity onPress={() => (copyAddress())}>
      <TextComponent style={[styles.address, styles.colorOverwrite]}>
              {getAddressForTxType()}
            </TextComponent>
      </TouchableOpacity>
      </View>
      <View style={styles.rightBlock}>
            <TextComponent style={styles.txDirection}>{txDirection?.toUpperCase()}</TextComponent>
            <TextComponent style={styles.amount} type={"H3"}>{clipAmount(quaiAmount)}&nbsp;QUAI</TextComponent>
            <TextComponent style={[styles.dateText, styles.colorOverwrite]}>{date}</TextComponent>
      </View>
      </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      height: 100,
      marginTop: 15,
      backgroundColor: theme.background,
      alignSelf: 'center',
      borderLeftColor: theme.border,
      borderTopColor: theme.border,
      borderLeftWidth:2,
      borderTopWidth: 1,
      borderRightWidth: 2,
      shadowOffset: {
        width: 3,
        height: 4,
      },
      borderBottomRightRadius: 15,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 5,
      borderTopLeftRadius: 5,
      shadowOpacity: 0.8,
      shadowRadius: 3,
      shadowColor: styledColors.gray,
    },
    leftBlock: {
    width: '20%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    },
    centreBlock: {
      width: '30%',
      height: '100%',
      flexDirection: 'column',
      alignContent: 'flex-start',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    rightBlock: {
      width: '50%',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'flex-end',
      alignContent: 'flex-end',
      justifyContent: 'center',
      paddingRight: 10,
    },
    rowContainer: {
      flexDirection: 'row',
      height: '100%',
      width: '100%',
      padding: 5,
    },
    image: {
      borderWidth: 1,
      borderColor: styledColors.normal,
      borderRadius: 24,
      height: 50,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: styledColors.white,
      marginRight: 5,
    },
    wrapper: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: theme.surface,
      marginBottom: 16,
    },
    colorOverwrite: {
      color: styledColors.gray,
    },
    amount: {
      fontSize: 18,
      lineHeight: 18,
      marginVertical: 10,
      color: styledColors.normal,
    },
    txDirection: {
    fontWeight: "800",
    },
    dateText: {
    fontWeight: "900",
    color: 'black',
    },
    address: {
    fontSize: 14,
    fontWeight: "bold",
    color: styledColors.normal,
    },
    separator: {
      flex: 1,
      marginLeft: 0,
    },
  });
