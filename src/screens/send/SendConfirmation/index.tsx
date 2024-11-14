import React, { useEffect, useState } from 'react';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { BannerComponent, TextComponent } from 'src/components';
import { buttonStyle, styledColors } from 'src/styles';
import {
  abbreviateAddress,
} from 'src/quai-mdk/addressUtils';
import ShareControl from 'src/components/ShareControl';
import { SendStackParamList } from 'src/navigation/stacks/SendStack';
import { TxStatus, TxStatusIndicator } from 'src/components/TxStatusIndicator';
import { BottomButton } from 'src/components/Buttons/BottomButton';

import { useSnackBar } from 'src/shared/context/snackBarContext';
import { addContact, useContacts } from 'src/shared/hooks/useContacts';
import { IUserProfileState } from 'src/store/models/reducers/userProfile';
import { IActiveWalletAddressState } from 'src/store/models/reducers/wallet';
import { ITxState } from 'src/store/models/reducers/tx';

type SendConfirmationScreenProps = NativeStackScreenProps<
  SendStackParamList,
  'SendConfirmation'
>;

interface IState {
  userProfileReducer: IUserProfileState;
  activeWalletReducer: IActiveWalletAddressState;
  txReducer: ITxState;
}

function SendConfirmationScreen({ route }: SendConfirmationScreenProps) {

  const { t } = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';
  const { senderAddress, senderUsername, senderPFP, receiverAddress, receiverPFP, receiverUsername, input } =
    route.params;
  const contacts = useContacts();
  const [address, setAddress] = useState();
  const { showSnackBar } = useSnackBar();
  const [connectionStatus, setConnectionStatus] = useState<NetInfoState>();
  const [showError, setShowError] = useState(false);
  const [contactSaved, setContactSaved] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [runTimer, setRunTimer] = useState(false);
  const isFocused = useIsFocused();
  //const [txStatus, setTxStatus] = useState(TxStatus.pending);
  const txStatus = useSelector(
    (state: IState) => state.txReducer.txStatus,
  );
  const [txState,setTxState] = useState(TxStatus.pending);

  const txError = useSelector(
    (state: IState) => state.txReducer.txError,
  );
  const txErrorMsg = useSelector(
    (state: IState) => state.txReducer.txErrorMsg,
  );
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(txStatus){
      setTxState(txStatus);
    }
  },[txStatus,isFocused]);

  useEffect(() => {
    if(isFocused){
     startTimeoutTimer(true);
    }
    if(txStatus === TxStatus.success){
    startTimeoutTimer(false);
    }
    if(txStatus === TxStatus.failed){
    startTimeoutTimer(false);
    }
  },[txStatus, isFocused]);

  useEffect(() => {
    if(timedOut){
    }
  },[timedOut]);


  const startTimeoutTimer = (runTimer:boolean) => {
    setRunTimer(runTimer);
    setTimeout(function(){
      if(runTimer){
      setTimedOut(true);
      }
      else{
      setTimedOut(false);
      }
    }, 10000);
  }
  // TODO: remove when setShowError is used
  //console.log(setShowError);
  //const nodeData = allNodeData[zone ? zone : INITIAL_ZONE];
  /*const transactionUrl = `${nodeData.provider.replace('rpc.', '')}/tx/${
    route.params.transaction.hash
  }`;
  */

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.light,
    flex: 1,
  };

  /*const subscribeToTransaction = useCallback(() => {
    waitForTransaction(route.params.transaction.hash, zone ? zone : INITIAL_ZONE)
      .then(receipt => {
        console.log(receipt?.status)
        const res = Number(receipt?.status)
        console.log('transaction reciept', res)
        if (res === 0) {
          setTxStatus(TxStatus.failed);
        } else if (res === 1) {
          setTxStatus(TxStatus.success);
        }
      })
      .catch(error => {
        console.log(error);
        setTxStatus(TxStatus.failed);
      });
  }, [setTxStatus, route.params.transaction.hash]);

  useEffect(() => {
    // re-subscribe to transaction if internet connection is lost and regained
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnectionStatus(state);
    });
    if (connectionStatus?.isInternetReachable === true) {
      console.log('subscribe to transaction');
      subscribeToTransaction();
    } else {
      showSnackBar({
        message: t('home.send.noInternet'),
        moreInfo: t('home.send.noInternetMessage') as string,
        type: 'error',
      });
    }
    return () => {
      unsubscribe();
    };
  }, [connectionStatus?.isInternetReachable, subscribeToTransaction]);
*/
  useEffect(() => {
    console.log('contacts', contacts);
    console.log('transaction', route.params.transaction);
    if (contacts) {
      contacts?.find(contact => contact.quaiAddress === receiverAddress) &&
        setContactSaved(true);
    }
  }, [contacts]);

  const saveToContacts = () => {
    addContact({
      quaiAddress: receiverAddress,
      username: receiverUsername!,
      profilePicture: receiverPFP!,
      qiPaymentCode: receiverAddress,
    }).then(() => {
      setContactSaved(true);
      showSnackBar({
        message: t('common.success'),
        moreInfo: t('home.send.savedToContacts') || '',
        type: 'success',
      });
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <BannerComponent
          boldText={t('home.send.somethingWrong')}
          showError={showError}
          text={t('home.send.retryTransaction')}
        />
        <ScrollView
          contentContainerStyle={[
            styles.confirmation,
            {
              borderColor: isDarkMode
                ? styledColors.darkGray
                : styledColors.border,
              backgroundColor: isDarkMode
                ? styledColors.dark
                : styledColors.white,
            },
          ]}
        >
          <TxStatusIndicator txStatus={txStatus} txErrorMessage={txErrorMsg} />
          <TextComponent type="H1">
            {input.value} {input.unit}
          </TextComponent>
          <TextComponent style={styles.ends} type="H3">
            {t('common.from')}
          </TextComponent>
          <TextComponent type="H2" style={styles.username}>
            {senderUsername}
          </TextComponent>
          <TextComponent
            type="H2"
            themeColor="primary"
          >
            {abbreviateAddress(senderAddress)}
          </TextComponent>
          <TextComponent style={styles.ends} type="H3">
            {t('common.sentTo')}
          </TextComponent>
          <TextComponent style={styles.username} type="H3">
            {receiverUsername}
          </TextComponent>
          <TextComponent
            type="H2"
          >
            {abbreviateAddress(receiverAddress)}
          </TextComponent>
          <View style={styles.shareControl}>
            {/* TODO: ask product what should be shared here */}
            <ShareControl share={''} />
          </View>
          {receiverUsername && !contactSaved ? (
            <TouchableOpacity
              style={[styles.button, styles.saveContact]}
              disabled={contactSaved}
              onPress={saveToContacts}
            >
              <TextComponent type="H3">
                {t('home.send.saveToContacts')}
              </TextComponent>
            </TouchableOpacity>
          ) : null}
          <BottomButton txStatus={txState} />
        </ScrollView>
        <TouchableOpacity onPress={() => {}}>
          <TextComponent
            onPress={() => Linking.openURL(
              `https://quaiscan.io/address/${senderAddress}?shard=cyprus1`
            )}
            style={styles.quaiSnap}
          >
            {t('home.send.viewOnExplorer')}
          </TextComponent>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  unit: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 2,
  },
  unitUSD: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 2,
    color: styledColors.gray,
  },
  ends: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 16,
    color: styledColors.gray,
  },
  username: {
    fontWeight: '700',
    fontSize: 16,
  },
  address: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
  },
  shareControl: {
    marginVertical: 16,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    flex: 1,
  },
  confirmation: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 8,
    width: '92%',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 64,
    marginTop: 16,
  },
  quaiSnap: {
    fontSize: 12,
    color: styledColors.gray,
    textDecorationLine: 'underline',
    marginVertical: 8,
  },
  saveContact: {
    backgroundColor: 'transparent',
    borderColor: '#808080',
    borderWidth: 1,
  },
  button: {
    ...buttonStyle.normal,
    alignSelf: 'center',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    minWidth: '96%',
    maxWidth: '96%',
    alignItems: 'center',
    height: 42,
    maxHeight: 50,
  },
});

export default SendConfirmationScreen;
