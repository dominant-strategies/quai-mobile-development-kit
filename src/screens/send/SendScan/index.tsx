import React, { useCallback, useRef } from 'react';
import { View } from 'react-native';
import {TextButton} from 'src/components';
import { StyleSheet } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ManualAddressModal } from 'src/components/ManualAddressModal';

import {
  CameraComponent,
  ContentComponent,
  ScannerType,
} from 'src/components';
import { RootNavigator } from 'src/navigation/utils';

const SendScanScreen: React.FC = () => {

  const manualAddressModalRef = useRef<BottomSheetModal>(null);
  
  const handlePresentManualAddressModalPress = useCallback(() => {
    manualAddressModalRef.current?.present();
  }, []);

  const handleContactsListPress = () => {
    RootNavigator.navigate('SendStack', { screen: 'ContactsList', params:{} })
  }

  const setManualAddress = (address: String | undefined) => {
    manualAddressModalRef.current?.dismiss();
  }
  
  return (
    <ContentComponent noNavButton hasBackgroundVariant>
      <View style={styles.scanContainer}>
      <CameraComponent scanType={ScannerType.SEND_AMOUNT} />
      </View>
      <View style={styles.buttonContainer}>
      <TextButton disabled={false} buttonLabel={'Contacts List'} handleButtonPress={handleContactsListPress}/>
          <TextButton disabled={false} buttonLabel={'Manually Enter Address'} handleButtonPress={handlePresentManualAddressModalPress}/>
          </View>
          <ManualAddressModal
        ref={manualAddressModalRef}
        setAddress={(selectedAddress:any) => setManualAddress(selectedAddress)}
        senderUsername=''
      />
    </ContentComponent>
  );
};

export default SendScanScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    height: 200,
    paddingTop: 10,
  },
  titleContainer: {
  backgroundColor: "white",
  paddingVertical: 20,
  marginTop: -40,
  },
  scanContainer: {
  backgroundColor: 'white',
  marginTop: 50,
  height: '80%',
  },
});