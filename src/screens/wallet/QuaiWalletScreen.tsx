import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { MainTabStackScreenProps } from 'src/navigation/stacks/MainStack';
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

import { useContacts } from 'src/shared/hooks';

import { useTheme } from 'src/shared/context/themeContext';
import { RootNavigator } from 'src/navigation/utils';

import { useIsFocused } from '@react-navigation/native';

import { IUserProfileState } from 'src/store/models/reducers/userProfile';
import { IActiveWalletAddressState} from 'src/store/models/reducers/wallet';
import * as walletActions from 'src/store/actions/walletActions';
import { quais } from 'quais';


export type Balances = Partial<Record<Zone, string>>;
interface IState {
  userProfileReducer: IUserProfileState;
  activeWalletReducer: IActiveWalletAddressState;
}

const QuaiWalletScreen: React.FC = () => {
  
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);
  const { isDarkMode } = useTheme();
  const activeAddress = useSelector(
    (state: IState) => state.activeWalletReducer.activeWalletAddress,
  );
  const activeZone = useSelector(
    (state: IState) => state.activeWalletReducer.activeWalletAddressZone,
  );
  const activeAddressBalance = useSelector(
    (state: IState) => state.activeWalletReducer.activeWalletAddressBalance,
  );
  const username = useSelector(
    (state: IState) => state.userProfileReducer.userName,
  );

  const activeAddressTransactions = useSelector((state: IState) => state.activeWalletReducer.activeWalletTransactions,
);
  
  const [loading, setLoading] = useState(false);


  const [refreshingTX, setRefreshingTX] = useState<boolean>(false);
  const dispatch = useDispatch();

  const isFocused = useIsFocused();



 useEffect(() => {
  if(isFocused){
  dispatch(walletActions.fetchActiveWalletAddressBalance());
  dispatch(walletActions.fetchActiveWalletAddressTransactions());
  };
 }, [isFocused]);

 useEffect(() => {
  if(refreshingTX){
    dispatch(walletActions.fetchActiveWalletAddressBalance());
    dispatch(walletActions.fetchActiveWalletAddressTransactions());
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
  const navigateToReferral = useCallback(() => {
    RootNavigator.navigate('SettingsStack', { screen: 'Referral' });
  }, []);

  // TODO: implement actual search logic
  const onSearchChange = (text: string) => console.log(text);
// remove loading here
  if (loading || !activeAddress || !activeZone || !activeAddressBalance) {
    return <LoaderComponent text={t('wallet.loading')} />;
  }

  return (
    <ContentComponent noNavButton>

      <View style={styles.cardWrapper}>
        <CardComponent
          size={CardSize.Small}
          currency='QUAI'
          balance={activeAddressBalance.toString() ?? ''}
          address={abbreviateAddress(activeAddress as string)}
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

        {activeAddressTransactions && activeAddressTransactions?.length === 0 ? (
          <EmptyTransactions refreshingTX={refreshingTX} onHandleRefresh={() => setRefreshingTX(true)}
           />
        ) : (
          <FlatList
            data={activeAddressTransactions}
            refreshing={refreshingTX}
            onRefresh={()=> setRefreshingTX(true)}
            contentContainerStyle={styles.flatlistContainer}
            onEndReachedThreshold={0.1}
            renderItem={({ item }) => (
              <ListItemComponent
                date={dateToLocaleString(
                  new Date(Number(item.timeStamp) * 1000),
                )}
                txDirection={getTXDirection(item.from, item.to)}
                thisWallet={activeAddress}
                from={item.from}
                to={item.to}
                address={item.from}
                picture={
                    <UserIcon />
                }
                quaiAmount={quais.formatQuai(item.value).toString()}
              />
            )}
            keyExtractor={tx => tx.hash}
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
    marginTop: 0,
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

export default QuaiWalletScreen;
