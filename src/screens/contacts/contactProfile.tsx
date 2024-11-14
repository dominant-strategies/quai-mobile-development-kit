import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';

import CopyOutline from 'src/assets/copyOutline.svg';
import {
  AvatarComponent,
  ButtonComponent,
  ContentComponent,
  TextComponent,
} from 'src/components';
import { RootStackNavigationProps } from 'src/navigation';
import { Contact, Currency, Theme } from 'src/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { abbreviateAddress } from 'src/quai-mdk/addressUtils';
import { useSnackBar } from 'src/shared/context/snackBarContext';

import { IUserProfileState } from 'src/store/models/reducers/userProfile';
import { IActiveQiWalletAddressState, IActiveWalletAddressState } from 'src/store/models/reducers/wallet';
import { useDispatch, useSelector } from 'react-redux';
import { SendStackParamList } from 'src/navigation/stacks/SendStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as contactsActions from 'src/store/actions/contactsActions';

interface IState {
  userProfileReducer: IUserProfileState;
  activeWalletReducer: IActiveWalletAddressState;
  activeQiWalletReducer: IActiveQiWalletAddressState;
}

type ContactProfileScreenProps = NativeStackScreenProps<
  SendStackParamList,
  'ContactProfile'
>;

export const ContactProfileScreen = ({ route}: ContactProfileScreenProps) => {
    const { profilePicture, username, quaiAddress, qiPaymentCode, contactIndex} = route.params;
    const { t } = useTranslation('translation', {
    keyPrefix: 'home.receive.ReceiveScreen',
  });
  const styles = useThemedStyle(themedStyle);
  const { showSnackBar } = useSnackBar();
  const navigation = useNavigation<RootStackNavigationProps<'Main'>>();
  const dispatch = useDispatch();
  const senderUsername = useSelector(
    (state: IState) => state.userProfileReducer.userName,
  );

  const copyToClipboard = (address: string) => {
    Clipboard.setString(address);
    showSnackBar({
      message: t('copiedToClipboard'),
      moreInfo: abbreviateAddress(address),
      type: 'success',
    });
  };
  const sendPayment = (currency: string) => {
    let sender = '';
    if(senderUsername){
        sender = senderUsername
    };
    console.log('currency',currency);
    navigation.navigate('SendStack', {
        screen: 'SendAmount',
        params: {
            currency,
            quaiAddress,
            qiPaymentCode,
            amount: 0,
            sender,
            receiverPFP: profilePicture,
            receiverUsername: username,
          },
    })
  };

  const deleteContact = () => {
    const deleteContact:Contact = {
        username,
        profilePicture,
        quaiAddress,
        qiPaymentCode
    }
    console.log('delete contact', deleteContact);
    dispatch(contactsActions.deleteContact(contactIndex));
    showSnackBar({
        message: t('Contact Added'),
        moreInfo: username,
        type: 'success',
      });
      navigation.navigate('SendStack', {
        screen: 'ContactsList',
        params: {},
    })
  }

  return (
    <ContentComponent title='Contact Profile'>
      <View style={styles.separator} />
      <View style={styles.nameAndPFPContainer}>
        <AvatarComponent
          containerStyle={styles.image}
          iconSize={60}
          profilePicture={profilePicture ?? ''}
        />
        <TextComponent type="H1" style={styles.username}>
          {username}
        </TextComponent>
      </View>
      <View style={styles.addresses}>
      <TextComponent type="H3" style={styles.addressTitle}>
          Quai Address:
        </TextComponent>
        <ButtonComponent
          type="secondary"
          titleColor="black"
          titleType="H2"
          onPress={() => copyToClipboard(quaiAddress)}
          onLongPress={() => copyToClipboard(quaiAddress)}
          style={styles.addressContainer}
          title={`${abbreviateAddress(quaiAddress)}`}
          RightIcon={<CopyOutline />}
        />
          <TextComponent type="H3" style={styles.addressTitle}>
          Qi Payment Code:
        </TextComponent>
        <ButtonComponent
          type="secondary"
          titleColor="black"
          titleType="H2"
          onPress={() => copyToClipboard(qiPaymentCode)}
          onLongPress={() => copyToClipboard(qiPaymentCode)}
          style={styles.addressContainer}
          title={`${abbreviateAddress(qiPaymentCode)}`}
          RightIcon={<CopyOutline />}
        />
        </View>
      <ButtonComponent
        style={styles.requestButton}
        type="secondary"
        title={'Send Quai Payment'}
        titleColor='white'
        onPress={() => sendPayment(Currency.QUAI)}
      />
         <ButtonComponent
        style={styles.requestButton}
        type="secondary"
        title={'Send Qi Payment'}
        titleColor='white'
        onPress={() => sendPayment(Currency.QI)}
      />
      <View style={styles.separator} />
      <ButtonComponent
        style={styles.deleteButton}
        type="secondary"
        titleType='H3'
        titleColor= 'white'
        title={'Delete Contact'}
        onPress={() => deleteContact()}
      />
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
    image: {
        marginBottom: 0,
      },
      nameAndPFPContainer: {
        marginTop: 12,
        marginBottom: 6,
        alignItems: 'center',
      },
    addressTitle:{
    marginTop: 12,
    },
    addresses:{
    marginBottom: 24,
    },
    username: {
      marginTop: 32,
    },
    addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      padding: 0,
      marginBottom: 0,
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
      marginTop: 8,
      backgroundColor: theme.normal
    },
    deleteButton: {
        marginTop: 8,
        backgroundColor: 'red'
      },
    separator: {
      flex: 1,
    },
  });