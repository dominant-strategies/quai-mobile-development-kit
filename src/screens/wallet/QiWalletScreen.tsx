import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardSize,
  CardComponent,
  ContentComponent,
  EmptyTransactions,
  ListItemComponent,
  LoaderComponent,
  TextComponent,
} from 'src/components';

import { Theme, Zone } from 'src/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import UserIcon from 'src/assets/accountDetails.svg';
import { styledColors } from 'src/styles';

import { dateToLocaleString, Timeframe } from 'src/quai-mdk/dateUtil';
import { abbreviateAddress } from 'src/quai-mdk/addressUtils';


import { useTheme } from 'src/shared/context/themeContext';
import { RootNavigator } from 'src/navigation/utils';

import { useIsFocused } from '@react-navigation/native';

import { IUserProfileState } from 'src/store/models/reducers/userProfile';
import { IActiveQiWalletAddressState} from 'src/store/models/reducers/wallet';
import * as qiWalletActions from 'src/store/actions/qiWalletActions';
import { quais } from 'quais';
import { IGlobalState } from 'src/store/models/reducers/global';


export type Balances = Partial<Record<Zone, string>>;
interface IState {
  userProfileReducer: IUserProfileState;
  activeQiWalletReducer: IActiveQiWalletAddressState;
  globalReducer: IGlobalState;
}

const QiWalletScreen: React.FC = () => {
  
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);
  const { isDarkMode } = useTheme();
  const qiScanInProgress = useSelector(
    (state: IState) => state.globalReducer.qiWalletScanInProgress,
  );
  const qiSyncInProgress = useSelector(
    (state: IState) => state.globalReducer.qiWalletSyncInProgress,
  );
  const activeAddress = useSelector(
    (state: IState) => state.activeQiWalletReducer.activeQiWalletAddress,
  );
  const activePaymentCode = useSelector(
    (state: IState) => state.activeQiWalletReducer.activeQiWalletPaymentCode,
  );
  const activeZone = useSelector(
    (state: IState) => state.activeQiWalletReducer.activeQiWalletAddressZone,
  );
  const activeAddressBalance = useSelector(
    (state: IState) => state.activeQiWalletReducer.activeQiWalletAddressBalance,
  );
  const username = useSelector(
    (state: IState) => state.userProfileReducer.userName,
  );

  const activeQiAddressTransactions = useSelector((state: IState) => state.activeQiWalletReducer.activeQiWalletTransactions,
);
  
  const [loading, setLoading] = useState(false);
  const [refreshingTX, setRefreshingTX] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

 useEffect(() => {
  if(isFocused){
    if(!qiScanInProgress && !qiSyncInProgress)
      {
        dispatch(qiWalletActions.scanQiHDWallet());
      };
  }
 }, [isFocused]);

 useEffect(() => {
  if(refreshingTX){
    if(!qiScanInProgress && !qiSyncInProgress)
    {
    dispatch(qiWalletActions.scanQiHDWallet());
    }
    setRefreshingTX(false);
  }
 },[refreshingTX])

  const getTXDirection = (from:string, to:string) => {
    const fromLC = from.toLowerCase();
    const toLC = to.toLowerCase();
    if(fromLC === toLC)
      {
        return 'transfer';
      }
    if(activeAddress?.toLowerCase() === from.toLowerCase())
      {
        return 'sent';
      }
    if(activeAddress?.toLowerCase() === to.toLowerCase())
      {
        return 'received';
      }

      return '';
  }


  // TODO: implement actual search logic
  const onSearchChange = (text: string) => console.log(text);
// remove loading here
  if (!activePaymentCode) {
    return <LoaderComponent text={t('wallet.loading')} />;
  }

  return (
    <ContentComponent noNavButton>

      <View style={styles.cardWrapper}>
        <CardComponent
          size={CardSize.Small}
          currency='Qi'
          balance={activeAddressBalance.toString() ?? ''}
          address={abbreviateAddress(activePaymentCode as string)}
          zone={'Cyprus 1'}
          title={t('wallet.balance')}
        />
      </View>
      <View style={styles.transactionsWrapper}>
        <View style={styles.transactionsHeader}>
          <TextComponent style={{ color: styledColors.normal }} type="H2">
            {t('wallet.transactionsHistory')}
          </TextComponent>
        </View>

        {activeQiAddressTransactions.length === 0 ? (
          <EmptyTransactions refreshingTX={refreshingTX} onHandleRefresh={() => setRefreshingTX(true)}
           />
        ) : (
          <FlatList
            data={activeQiAddressTransactions}
            refreshing={refreshingTX}
            onRefresh={()=> setRefreshingTX(true)}
            contentContainerStyle={styles.flatlistContainer}
            onEndReachedThreshold={0.1}
            renderItem={({ item }) => (
              <ListItemComponent
                date={dateToLocaleString(
                  new Date(Number(0) * 1000),
                )}
                txDirection={getTXDirection('', '')}
                thisWallet={activeAddress}
                from={''}
                to={''}
                address={''}
                picture={
                    <UserIcon />
                }
                quaiAmount={'0'}
              />
            )}
            keyExtractor={tx => tx.hash ? tx.hash : tx.unsignedSerialized}
          />
        )}
      </View>
    </ContentComponent>
  );
};
const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    addressButton: {
      backgroundColor: theme.normal,
      width: 210,
    },
    headerBar: {
    marginTop: -40,
    },
    button: {
      height: 32,
      justifyContent: 'center',
      borderRadius: 8,
    },
    buttonWrapper: {
      backgroundColor: theme.surface,
      borderRightWidth: 0,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      flexDirection: 'row',
      padding: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: theme.border,
      height: 40,
    },
    cardWrapper: {
      marginBottom: 30,
      marginTop: 20,
    },
    colorOverwrite: {
      color: styledColors.white,
    },
    earnButton: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: styledColors.gray,
      width: 110,
    },
    filterButton: {
      backgroundColor: theme.surface,
      color: styledColors.gray,
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.border,
      borderRadius: 4,
      height: 25,
      width: 77,
    },
    transactionsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 2,
    },
    transactionsWrapper: {
      backgroundColor: theme.surface,
      padding: 8,
      marginTop: -30,
    },
    flatlistContainer: {
      // TODO: use flex
      paddingBottom: 280,
      marginBottom: 150,
    },
    searchbarWrapper: {
      marginBottom: 22,
      marginTop: 10,
    },
    backgroundSurface: {
      backgroundColor: theme.background,
    },
  });

export default QiWalletScreen;
