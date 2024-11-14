import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import {
  BannerComponent,
  ContentComponent,
  AmountDisplay,
  TextComponent,
  AvatarComponent,
} from 'src/components';
import { buttonStyle, fontStyle, styledColors } from 'src/styles';
import { Currency, Zone } from 'src/types';
import { abbreviateAddress } from 'src/quai-mdk/addressUtils';
import { dateToLocaleString } from 'src/quai-mdk/dateUtil';

import { SendStackParamList } from 'src/navigation/stacks/SendStack';
import { IUserProfileState } from 'src/store/models/reducers/userProfile';
import { IActiveWalletAddressState, IPrimaryWalletState } from 'src/store/models/reducers/wallet';

import * as walletActions from 'src/store/actions/walletActions';
import * as qiWalletActions from 'src/store/actions/qiWalletActions';
import * as txActions from 'src/store/actions/txActions';
import { ISendTransaction } from 'src/store/models/actions/wallet';
import { TxStatus } from 'src/components/TxStatusIndicator';
import { input } from 'src/quai-mdk/types';
import { RootNavigator } from 'src/navigation/utils';

type SendOverviewProps = NativeStackScreenProps<
  SendStackParamList,
  'SendOverview'
>;

interface IState {
  userProfileReducer: IUserProfileState;
  activeWalletReducer: IActiveWalletAddressState;
  primaryWalletReducer: IPrimaryWalletState;
}

function SendOverviewScreen({ route, navigation }: SendOverviewProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';
  const {
    receiverAddress,
    receiverPFP,
    receiverUsername,
    tip,
    input,
  } = route.params;
  const [address,setAddress] = useState<string | undefined>();
  const [sendAmount, setSendAmount] = useState<string | undefined>();
  const [sendToAddress, setSendToAddress] = useState<string | undefined>();
  const activeAddress = useSelector(
    (state: IState) => state.activeWalletReducer.activeWalletAddress,
  );
  const senderUsername = useSelector(
    (state: IState) => state.userProfileReducer.userName,
  );
  const senderPFP = useSelector(
    (state: IState) => state.userProfileReducer.userAvatar,
  );
  const [gasFee, setGasFee] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);


  useEffect(() => {
    if(activeAddress){
      setAddress(activeAddress);
    }
    if(receiverAddress){
      setSendToAddress(receiverAddress);
    }
    if(input.value)
      {
        if(tip){
          const val1=Number(input.value);
          const val2=Number(tip);
          const sum = val1 + val2
          const result = sum.toString();
          setSendAmount(result);
        }
        if(!tip){
          setSendAmount(input.value);
        }
      }

    // TODO: estimate gas before sending
    // estimateGas(address, eqInput.value).then(gas => console.log('gas', gas));
    setGasFee(21000 * 0.000000001);
  }, [activeAddress,input.value,tip,receiverAddress]);

  const goToLearnMore = () => {
    Linking.openURL('https://qu.ai/')
  };
  
const send = () => {
  if(address && sendAmount && sendToAddress){
  console.log('sending tx request to redux action', address, sendToAddress, sendAmount)
    setLoading(true);
    dispatch(txActions.setTxStatus(TxStatus.ready));
    dispatch(txActions.setTxError(false));
    dispatch(txActions.setTxErrorMsg(''));
    const sendInput:input = {
      value: sendAmount,
      unit: input.unit,
    }   
    let txData:ISendTransaction = {
      from: address,
      to: sendToAddress,
      input: sendInput,
      receiverPFP: receiverPFP,
      receiverUsername: receiverUsername,
      senderPFP: senderPFP,
      senderUsername: senderUsername
    }
    console.log('send amount', sendInput.value)
    if(input.unit === Currency.QUAI){
    dispatch(walletActions.sendQuaiTransaction(txData));
    RootNavigator.navigate('SendStack', { screen: 'SendConfirmation', 
      params:{
      receiverAddress,
      receiverUsername,
      receiverPFP,
      senderUsername: senderUsername ? senderUsername : '',
      senderPFP: senderPFP,
      senderAddress: address,
      input: sendInput,
      tip,
      } })
    }
    else{
    dispatch(qiWalletActions.sendQiTransaction(txData))
    }
    setLoading(false);
  }
  };

  return (
    <ContentComponent hasBackgroundVariant title={t('home.send.label')}>
      <View style={styles.mainContainer}>
        <View style={styles.bannerWrapper}>
          <View style={styles.banner}>
            <BannerComponent
              boldText="Insufficient Funds."
              showError={showError}
              text={`You need more ${input.unit.toString()}`}
            />
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <View
            style={[
              styles.overview,
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
            <View style={styles.container}>
              <AmountDisplay
                value={Number(input.value).toFixed(5)}
                suffix={` ${input.unit}`}
              />
            </View>
            <View
              style={[
                styles.border,
                {
                  backgroundColor: isDarkMode
                    ? styledColors.darkGray
                    : styledColors.border,
                },
              ]}
            />
            <Text style={styles.date}>{dateToLocaleString(new Date())}</Text>
            <View style={styles.receiver}>
            <AvatarComponent
              containerStyle={styles.image}
              iconSize={60}
              profilePicture={receiverPFP ?? ''}
              />
              <TextComponent style={styles.username} type="paragraph">
                {t('common:to')} {receiverUsername}
              </TextComponent>
              <TextComponent type="H2" themeColor="primary" style={styles.wallet}>
                {abbreviateAddress(receiverAddress)}
              </TextComponent>
            </View>
            <View
              style={[
                styles.border,
                {
                  backgroundColor: isDarkMode
                    ? styledColors.white
                    : styledColors.border,
                },
              ]}
            />
            <View style={styles.detailsContainer}>
              <View style={styles.details}>
                <View style={styles.detailLabel}>
                  <TextComponent type="paragraph">
                    {t('home.send.sending')}
                  </TextComponent>
                </View>
                <View>
                  <Text style={[styles.unit,{
                  color: isDarkMode
                    ? styledColors.white
                    : styledColors.darkGray,
                },]}>
                    {Number(input.value).toFixed(5)} {input.unit.toString()}
                  </Text>
                </View>
              </View>
              {tip && Number(tip) > 0 ? (
                <View style={styles.details}>
                  <View style={styles.detailLabel}>
                    <TextComponent type="paragraph">
                      {t('home.send.includedTip')}
                    </TextComponent>
                  </View>
                  <View>
                    <Text style={[styles.unit, {
                  color: isDarkMode
                    ? styledColors.white
                    : styledColors.darkGray,
                },]}>
                    {Number(tip).toFixed(5)} {input.unit.toString()};
                    </Text>
                  </View>
                </View>
              ) : null}
              <View style={styles.details}>
                <View style={styles.detailLabel}>
                  <TextComponent type="paragraph">
                    {t('home.send.gasFee')}
                  </TextComponent>
                </View>
                <View>
                  <Text style={[styles.unit,  {
                  color: isDarkMode
                    ? styledColors.white
                    : styledColors.darkGray,
                },]}>
                    {gasFee.toFixed(5)} {input.unit}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.border,
                {
                  backgroundColor: isDarkMode
                    ? styledColors.darkGray
                    : styledColors.border,
                },
              ]}
            />
            <View style={styles.total}>
              <View style={styles.detailLabel}>
                <TextComponent type="paragraph">
                  {t('home.send.totalCost')}
                </TextComponent>
              </View>
              <View>
                <Text style={[styles.unit,{
                  color: isDarkMode
                    ? styledColors.white
                    : styledColors.darkGray,
                },]}>
                  {`${(
                      Number(input.value) + Number(tip) + Number(gasFee)
                    ).toFixed(5)} ${input.unit}`}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={() => {goToLearnMore}}>
          <TextComponent style={styles.learnMoreText}>
            {t('common.learnMore')}
          </TextComponent>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={loading}
          onPress={send}
          style={styles.button}
        >
          {loading ? (
            <ActivityIndicator color={styledColors.white} />
          ) : (
            <TextComponent
              type="H3"
              style={{
                color: styledColors.white,
              }}
            >
              {`${t('home.send.pay')} (${(
                Number(input.value) + Number(tip) + Number(gasFee)
              ).toFixed(5)}) ${input.unit}`}
            </TextComponent>
          )}
        </TouchableOpacity>
      </View>
    </ContentComponent>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerWrapper: {
    alignItems: 'center',
  },
  banner: {
    width: '90%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  receiver: {
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overview: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 8,
    width: '90%',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exchangeUnit: {
    width: 90,
    height: 24,
    borderRadius: 42,
    borderWidth: 1,
    borderColor: styledColors.border,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    marginVertical: 10,
  },
  border: {
    width: '100%',
    height: 1,
  },
  date: {
    marginVertical: 16,
    fontWeight: '600',
    fontSize: 14,
  },
  username: {
    ...fontStyle.fontH3,
    marginVertical: 8,
    fontSize: 14,
  },
  wallet: {
    marginVertical: 8,
    fontSize: 18,
    lineHeight: 24,
  },
  detailsContainer: {
    width: '100%',
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  details: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  detailLabel: {
    height: '100%',
  },
  total: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  alignRight: {
    textAlign: 'right',
  },
  learnMoreText: {
    color: styledColors.black,
    marginBottom: 50,
  },
  button: {
    ...buttonStyle.normal,
    alignSelf: 'center',
    padding: 10,
    marginBottom: 30,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    paddingVertical: 16,
    maxHeight: 50,
  },
  amountUnit: {
    marginVertical: 8,
  },
  unit: {
    textAlign: 'right',
    fontWeight: '700',
    fontSize: 14,
  },
  unitUSD: {
    fontSize: 14,
    textAlign: 'right',
  },
  image: {
    borderRadius: 70,
    height: 60,
    width: 60,
  },
});

export default SendOverviewScreen;
