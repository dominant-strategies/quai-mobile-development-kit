import React from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TextComponent } from './TextComponent';
import { t } from 'i18next';
import {TextButton} from 'src/components/Buttons/textButton';

interface EmptyTransactionsProps {
  containerStyle?: StyleProp<ViewStyle>;
  refreshingTX: boolean;
  onHandleRefresh: () => void;
}

export const EmptyTransactions: React.FC<EmptyTransactionsProps> = ({
  containerStyle,
  refreshingTX,
  onHandleRefresh,
}) => {

  return (
    <View style={styles.container}>
        <View style={styles.imageHolder}>
        <Image style={styles.image} source={require('src/assets/noTransactions.png')}/>
        </View>
      {!refreshingTX && 
      <>
      <TextComponent type="H2">
            {t('wallet.noTransaction')}
          </TextComponent>
          <TextButton disabled={false} buttonLabel={'Refresh Transactions'} handleButtonPress={onHandleRefresh}/>
      </>
      }
      {refreshingTX &&
        <>
           <TextComponent type="H2">
            refreshing transactions
          </TextComponent>
        </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 250,
      marginTop: 50,
      paddingHorizontal: 0,
      paddingTop: 10,
      alignContent: 'center',
    },
    imageHolder: {
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    },
    image: {
    alignSelf: 'center',
    marginBottom: 20,
    width: 100,
    height: 100,
    },

  });