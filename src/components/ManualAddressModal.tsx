import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  BottomSheetModalComponent,
  ButtonComponent,
  TextComponent,
} from 'src/components';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Currency, Theme } from 'src/types';
import { useThemedStyle} from 'src/shared/hooks';
import { styledColors } from 'src/styles';
import { useTheme } from 'src/shared/context/themeContext';
import { useTranslation } from 'react-i18next';
import {TextButton} from 'src/components/Buttons/textButton';
import Clipboard from '@react-native-clipboard/clipboard';
import { RootNavigator } from 'src/navigation/utils';


type ManualAddressModalProps = {
  setAddress: (selectedAddress?: string) => void;
  senderUsername: string;
};

export const ManualAddressModal = forwardRef<BottomSheetModal, ManualAddressModalProps>(
  (
    {
      setAddress,
      senderUsername,
    },
    ref,
  ) => {
    const { t } = useTranslation('translation', { keyPrefix: 'wallet' });
    const { theme } = useTheme();
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredProfileImage, setEnteredProfileImage] = useState('');
    const [enteredQuaiAddress, setEnteredQuaiAddress] = useState('');
    const [enteredQiPaymentCode, setEnteredQiPaymentCode] = useState('');
    const styles = useThemedStyle(themedStyle);
    
    const updateQuaiAddressValue = (address:string) => {
        setEnteredQuaiAddress(address);
    }

    const fetchClipboardAddress = async () => {
        const addr = await Clipboard.getString();
        setEnteredQuaiAddress(addr);
        return addr;
    };

    const createContact = () => {
      console.log('create contact!', enteredProfileImage);
      RootNavigator.navigate('SendStack', {
        screen: 'ContactScan',
        params: {
          quaiAddress: enteredQuaiAddress,
          qiPaymentCode: enteredQiPaymentCode,
          username: enteredUsername,
          profilePicture: enteredProfileImage,
        },
      })
    }

      const continueWithManualAddr = () =>{
      let isQuaiAddress = false;
      const slice = enteredQuaiAddress.slice(0,3);
      if(slice == '0x0')
        {isQuaiAddress = true};
      console.log('is Quai Address check', isQuaiAddress, slice);
      let currency = null;
      let quaiAddress = '';
      let qiPaymentCode = '';
      if(isQuaiAddress){
        currency = Currency.QUAI;
        quaiAddress = enteredQuaiAddress;
      }
      else{
        currency = Currency.QI;
        qiPaymentCode = enteredQiPaymentCode;
      }
      setAddress('');
      RootNavigator.navigate('SendStack', {
        screen: 'ContactScan',
        params: {
          quaiAddress: enteredQuaiAddress,
          qiPaymentCode: enteredQiPaymentCode,
          username: enteredUsername,
          profilePicture: enteredProfileImage,
        },
      })
    };

    return (
      <BottomSheetModalComponent ref={ref}>
        <View style={styles.wrapper}>
          <ScrollView
            style={{ height: Dimensions.get('window').height * 0.65 }}
          >
                  <TextComponent type="H3" style={styles.fieldLabel}>
             Username:
            </TextComponent>
            <TextInput
                onChangeText={(text) => setEnteredUsername(text)}
                keyboardType="default"
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
                placeholderTextColor={theme.secondary}
                style={styles.addressInput}
                value={enteredUsername}
              />
            <TextComponent type="H3" style={styles.fieldLabel}>
             Profile Image URL:
            </TextComponent>
            <TextInput
                onChangeText={(text) => setEnteredProfileImage(text)}
                keyboardType="default"
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
                placeholderTextColor={theme.secondary}
                style={styles.addressInput}
                value={enteredProfileImage}
              />
                <TextComponent type="H3" style={styles.fieldLabel}>
              Quai Address:
            </TextComponent>
            <TextInput
                onChangeText={(text) => setEnteredQuaiAddress(text)}
                keyboardType="default"
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
                placeholderTextColor={theme.secondary}
                style={styles.addressInput}
                value={enteredQuaiAddress}
              />
            <TextComponent type="H3" style={styles.fieldLabel}>
              Qi Payment Code:
            </TextComponent>
              <TextInput
                onChangeText={(text) => setEnteredQiPaymentCode(text)}
                keyboardType="default"
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
                placeholderTextColor={theme.secondary}
                style={styles.addressInput}
                value={enteredQiPaymentCode}
              />
            <TextButton disabled={false} buttonLabel={'copy from clipboard'} handleButtonPress={fetchClipboardAddress}/>
            <ButtonComponent
        style={styles.continueButton}
        type="secondary"
        title={'Continue'}
        titleColor="white"
        onPress={() => createContact()}
      />
          </ScrollView>
        </View>
      </BottomSheetModalComponent>
    );
  },
);

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      padding: 16,
      backgroundColor: theme.surface,
    },
    title: {
      fontSize: 32,
      height: 64,
      paddingBottom: 10,
    },
    fieldLabel: {
      textAlign: 'left',
      paddingTop: 10,
      paddingBottom: 5,
    },
    titleWrapper: {
      marginBottom: 20,
      paddingBottom: 10,
    },
    heading: {
      fontSize: 16,
      marginTop: 8,
      marginBottom: 8,
      textAlign: 'justify',
    },
    addressInput: {
      borderColor: styledColors.normal,
      borderRadius: 4,
      borderWidth: 2,
      color: theme.primary,
      fontSize: 18,
      height: 60,
      padding: 8,
      width: '90%',
    },
    addressEntryWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      width: "100%",
      marginBottom: 0,
    },
    buttonsWrapper: {
      width: '100%',
      flexDirection: 'row',
      paddingTop: (Dimensions.get('window').height * 0.15 - 32) / 4,
      justifyContent: 'space-between',
      height: Dimensions.get('window').height * 0.15,
      borderColor: theme.border,
      borderTopWidth: 1,
    },
    applyButtonContainer: {
      width: 220,
    },
    button: {
      height: 32,
      padding: 0,
      justifyContent: 'center',
    },
    clearButtonContainer: { width: 120 },
    clearButton: {
      borderColor: styledColors.gray,
      borderWidth: 1,
    },
    continueButton: {
        marginTop: 50,
        marginBottom: 5,
        backgroundColor: theme.normal,
      },
  });
