import React, { useState } from 'react';
import { Dimensions, Linking, ScrollView, Share, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import UploadIcon from 'src/assets/upload.svg';
import {
  ButtonComponent,
  ContentComponent,
  AmountDisplay,
  QRCodeComponent,
  TextComponent,
} from 'src/components';
import { fontStyle, styledColors } from 'src/styles';
import {
  useAmountInput,
  useThemedStyle,
} from 'src/shared/hooks';
import { RootNavigator } from 'src/navigation/utils';
import { Currency, Theme } from 'src/types';
import { abbreviateAddress } from 'src/quai-mdk/addressUtils';

import { ReceiveStackScreenProps } from 'src/navigation/stacks/ReceiveStack';
import { IUserProfileState } from 'src/store/models/reducers/userProfile';
import { IActiveQiWalletAddressState, IActiveWalletAddressState } from 'src/store/models/reducers/wallet';


const isWindowSmallerThanScreen =
  Dimensions.get('window').height < Dimensions.get('screen').height;

interface IState {
  userProfileReducer: IUserProfileState;
  activeWalletReducer: IActiveWalletAddressState;
  activeQiWalletReducer: IActiveQiWalletAddressState;
}

export const ReceiveQRScreen: React.FC<
  ReceiveStackScreenProps<'ReceiveQR'>
> = ({ route }) => {
  const { amount, currency } = route.params;
  const { t } = useTranslation();
  const [quaiRate, setQuaiRate] = useState();

  const activeAddress = useSelector(
    (state: IState) => state.activeWalletReducer.activeWalletAddress,
  );
  const activePaymentCode = useSelector(
    (state: IState) => state.activeQiWalletReducer.activeQiWalletPaymentCode,
  );
  const username = useSelector(
    (state: IState) => state.userProfileReducer.userName,
  );

  const { input, eqInput, onSwap } = useAmountInput(
    amount.toString(),
    quaiRate,
  );
  const share = () => {
    const shareLink = ( `https://pay?username=${username}&address=${activeAddress}&amount=${amount.toString()}&token=${input.unit}`)
    Share.share({
      title: t('receive.shareYourAddress') ?? '',
      message:`Please send ${amount.toString()} ${input.unit} to the following Quai wallet address: ${activeAddress}. Click on the link to open in Quai:`,
      url: shareLink
    });
  };

  const goToQuaiInfo = () => {
      Linking.openURL('https://qu.ai/')
  };

  const styles = useThemedStyle(themedStyle);

  return (
    <ContentComponent hasBackgroundVariant title={t('common.request')}>
      <ScrollView
        alwaysBounceVertical={isWindowSmallerThanScreen}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.walletCard}>
          <View style={styles.separator} />
          <View style={styles.requestedAmount}>
      
            <AmountDisplay
              prefix={input.unit === 'QUAI' ? '' : undefined}
              suffix={` ${currency.toString()}`}
              value={input.value}
            />
          </View>
          {currency === Currency.QUAI ?
          <QRCodeComponent
            value={JSON.stringify({
              qrType: 'PaymentRequest',
              currency: currency.toString(),
              qiPaymentCode: 'N/A',
              quaiAddress: activeAddress,
              username,
              amount,
            })}
          />
          : 
          <QRCodeComponent
          value={JSON.stringify({
          qrType: 'PaymentRequest',
          currency: currency.toString(),
          qiPaymentCode: activePaymentCode,
          quaiAddress: 'N/A',
          username,
          amount,
          })}
          />
          }
          <View style={styles.userInfo}>
            <TextComponent type="H2">{username}</TextComponent>
            <TextComponent type="H3" themeColor="primary">
              {currency === Currency.QUAI ? abbreviateAddress(activeAddress) : abbreviateAddress(activePaymentCode) }
            </TextComponent>
          </View>
          <View style={styles.separator} />
        </View>
        <View>
          <ButtonComponent
            onPress={share}
            style={styles.shareButton}
            titleColor='black'
            title={t('common.share')}
            RightIcon={<UploadIcon color={styledColors.black} />}
          />
        </View>
        <ButtonComponent
          title={t('receive.qrScreen.complete')}
          titleColor='white'
          style={styles.completeButton}
          onPress={RootNavigator.goHome}
        />
              <ButtonComponent
            type="secondary"
            titleType="default"
            titleColor="black"
            style={styles.learnMore}
            title="Learn more about Quai"
            onPress={goToQuaiInfo}
          />
      </ScrollView>
    </ContentComponent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    walletCard: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      marginHorizontal: 16,
      paddingVertical: 36,
      backgroundColor: theme.surface,
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      minHeight: 420,
    },
    requestedAmount: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    userInfo: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12,
    },
    username: {
      ...fontStyle.fontH2,
      fontSize: 20,
    },
    shareControl: {
      marginTop: 12,
      marginBottom: 16,
      alignItems: 'center',
    },
    shareButton: {
      marginTop: 16,
      marginHorizontal: 64,
      backgroundColor: 'white',
    },
    learnMore: {
      paddingVertical: 16,
    },
    completeButton: {
      marginHorizontal: 16,
      marginTop: 50,
      marginBottom: 20,
      backgroundColor: theme.normal,
    },
    swapButton: {
      borderColor: theme.border,
      paddingVertical: 6,
    },
    swapButtonContainer: {
      width: 75,
    },
    swapIcon: {
      color: theme.primary,
    },
    separator: {
      flex: 1,
    },
  });
