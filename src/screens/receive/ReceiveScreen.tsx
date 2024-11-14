import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';

import CopyOutline from 'src/assets/copyOutline.svg';
import {
  ActiveAddressModal,
  ButtonComponent,
  ContentComponent,
  LoaderComponent,
  QRCodeComponent,
  TextComponent,
  useBottomSheetModal,
} from 'src/components';
import { RootStackNavigationProps } from 'src/navigation';
import { Theme } from 'src/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { abbreviateAddress } from 'src/quai-mdk/addressUtils';
import { useSnackBar } from 'src/shared/context/snackBarContext';

import { IUserProfileState } from 'src/store/models/reducers/userProfile';
import { IActiveQiWalletAddressState, IActiveWalletAddressState } from 'src/store/models/reducers/wallet';
import { useSelector } from 'react-redux';

interface IState {
  userProfileReducer: IUserProfileState;
  activeWalletReducer: IActiveWalletAddressState;
  activeQiWalletReducer: IActiveQiWalletAddressState;
}


export const ReceiveScreen = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'home.receive.ReceiveScreen',
  });
  const styles = useThemedStyle(themedStyle);
  const { showSnackBar } = useSnackBar();
  const navigation = useNavigation<RootStackNavigationProps<'Main'>>();
  const { ref: activeAddressModalRef } = useBottomSheetModal();
  const activeAddress = useSelector(
    (state: IState) => state.activeWalletReducer.activeWalletAddress,
  );
  const activePaymentCode = useSelector(
    (state: IState) => state.activeQiWalletReducer.activeQiWalletPaymentCode,
  );

  const profilePicture = useSelector(
    (state: IState) => state.userProfileReducer.userAvatar,
  )
  const username = useSelector(
    (state: IState) => state.userProfileReducer.userName,
  );

  const [showActiveAddressModal, setShowActiveAddressModal] = useState(false);

  if (!profilePicture || !username || !activeAddress || !activePaymentCode) {
    return <LoaderComponent text={t('loading')} />;
  }

  const copyToClipboard = (address: string) => {
    Clipboard.setString(address);
    showSnackBar({
      message: t('copiedToClipboard'),
      moreInfo: abbreviateAddress(address),
      type: 'success',
    });
  };

  const handleOpenActiveAddressModal = () => {
    activeAddressModalRef.current?.present();
  };
  const goToInputScreen = () => {
    navigation.navigate('ReceiveStack', {
      screen: 'ReceiveAmountInput',
    });
  };
  // TODO: add proper action and link
  const goToLearnMore = () => {};

  return (
    <ContentComponent
      noNavButton
      hasBackgroundVariant
      containerStyle={styles.container}
    >
      <View style={styles.separator} />
      <View style={styles.walletView}>
        <QRCodeComponent
          value={JSON.stringify({
            qrType: 'Contact',
            qiPaymentCode: activePaymentCode,
            quaiAddress: activeAddress,
            username,
            profilePicture,
          })}
        />
        <TextComponent type="H2" style={styles.username}>
          {username}
        </TextComponent>
        <ButtonComponent
          type="secondary"
          titleColor="gray"
          titleType="paragraph"
          onPress={() => copyToClipboard(activeAddress)}
          onLongPress={() => copyToClipboard(activeAddress)}
          style={styles.addressContainer}
          title={`Quai: ${abbreviateAddress(activeAddress)}`}
          RightIcon={<CopyOutline />}
        />
        <ButtonComponent
          type="secondary"
          titleColor="gray"
          titleType="paragraph"
          onPress={() => copyToClipboard(activePaymentCode)}
          onLongPress={() => copyToClipboard(activePaymentCode)}
          style={styles.addressContainer}
          title={`Qi: ${abbreviateAddress(activePaymentCode)}`}
          RightIcon={<CopyOutline />}
        />
      </View>
      <ButtonComponent
        style={styles.requestButton}
        type="secondary"
        title={t('request')}
        onPress={goToInputScreen}
      />
      <View style={styles.separator} />
    {
      showActiveAddressModal && 
      <ActiveAddressModal ref={activeAddressModalRef} />
    }
    </ContentComponent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 80,
    },
    username: {
      fontSize: 20,
    },
    addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      padding: 0,
      marginBottom: 20,
      gap: 8,
      marginLeft: 8, // To compensate the gap and keep address centered
    },
    activeAddressPillContainer: {
      marginTop: 20,
    },
    activeAddressPill: {
      marginBottom: 20,
      borderColor: theme.border,
      paddingVertical: 8,
      paddingHorizontal: 16,
      alignSelf: 'center', // to avoid stretching horizontally
    },
    walletView: {
      height: Dimensions.get('window').height / 2,
      paddingVertical: 40,
      justifyContent: 'center',
      borderRadius: 8,
      borderWidth: 1,
      backgroundColor: theme.surface,
      borderColor: theme.border,
    },
    requestButton: {
      marginTop: 15,
      backgroundColor: theme.surface,
    },
    separator: {
      flex: 1,
    },
  });
