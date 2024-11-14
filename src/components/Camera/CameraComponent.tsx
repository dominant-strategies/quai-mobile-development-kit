import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, AlertButton, Dimensions, Linking, StyleSheet, Text, View } from 'react-native';
import { RNHoleView } from 'react-native-hole-view';
import { CameraPermissionStatus, Code, useCameraDevice, useCodeScanner } from 'react-native-vision-camera'
import { Camera } from 'react-native-vision-camera';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useIsForeground } from 'src/quai-mdk/hooks/useIsForeground';
import { styledColors } from '../../styles';
import { Zone } from 'src/types';
import makeBlockie from 'ethereum-blockies-base64';
import { RootNavigator } from 'src/navigation/utils';
import { ScannerType } from './CameraComponent.types';

import { useDispatch } from 'react-redux';

const windowWidth = Dimensions.get('window').width;
export const squareHoleSize = windowWidth * 0.65;
const squarePaddingRight = (windowWidth - squareHoleSize) / 2;

interface CameraComponentProps {
  scanType: ScannerType;
  toggleLoader?: (toggle: boolean) => void;
  recoverAccount?: (seedPhrase: string) => void;
  toggleRedirecting?: (toggle: boolean) => void;
}

export const CameraComponent: React.FC<CameraComponentProps> = ({
  scanType, 
  toggleLoader, 
  toggleRedirecting,
  recoverAccount,
}) => {
  
    // 1. Use a simple default back camera
    const device = useCameraDevice('back')
    const dispatch = useDispatch();
    
    // 2. Only activate Camera when the app is focused and this screen is currently opened
    const isFocused = useIsFocused()
    const isForeground = useIsForeground()
    const isActive = isFocused && isForeground

    const [cameraPermissionStatus, setCameraPermissionStatus] = useState<CameraPermissionStatus>('not-determined');
    const [hasPermission, setHasPermission] = useState<Boolean>(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    // 3. (Optional) enable a torch setting
    const [torch, setTorch] = useState(false);
    const sender = '';

  useEffect(() => {
    if (isActive) {
      console.log('camera is ready');
      setIsCameraReady(true);
    } else {
      console.log('camera is not ready');
      setIsCameraReady(false);
    }
  }, [isFocused, isActive]);

  useEffect(() => {
    (async () => {
      console.log('Requesting camera permission...')
      const permission = await Camera.requestCameraPermission()
      console.log(`Camera permission status: ${permission}`)
      if (permission === 'denied') await Linking.openSettings()
      setCameraPermissionStatus(permission)
      if (permission === 'granted') setHasPermission(true);
    })();
  }, []);

const onCodeScanned = useCallback((codes: Code[]) => {
  console.log('code scanned', codes[0]?.value);
    const value = codes[0]?.value;
    if(value == null)
    {
      Alert.alert('ERROR', 'No Code Value provided');
      return;  
    };
    if(scanType === ScannerType.SEND_AMOUNT){
    const {qrType} = JSON.parse(value as string)
    console.log('qrType', qrType);
      if(qrType === 'PaymentRequest'){
        if (value) {
          const {currency, qiPaymentCode, quaiAddress, username, amount, profilePicture } = JSON.parse(
            value as string,
          );
        setIsCameraReady(false);
        RootNavigator.navigate('SendStack', {
          screen: 'SendAmount',
          params: {
            amount,
            currency,
            qiPaymentCode,
            quaiAddress,
            // TODO: replace address to generate blockie with walletObject[zone] when setup
            receiverPFP: Zone?.[profilePicture as keyof typeof Zone]
              ? makeBlockie(quaiAddress)
              : profilePicture,
            receiverUsername: username,
            sender: sender!,
          },
        });
      }
      return;
    }
     if(qrType === 'Contact'){
      const { qiPaymentCode, quaiAddress, username, profilePicture } = JSON.parse(
        value as string,
      );
      setIsCameraReady(false);
      RootNavigator.navigate('SendStack', {
        screen: 'ContactScan',
        params: {
          qiPaymentCode,
          quaiAddress,
          username,
          profilePicture
        },
      });
      return;
    }
    }
    if(scanType === ScannerType.LOGIN_CODE){
      if (codes.length > 0 && codes[0].value) {
        const { seedPhrase } = JSON.parse(
          value as string,
        );
        if (seedPhrase) {
          if(recoverAccount && toggleLoader){
         recoverAccount(seedPhrase);
         toggleLoader(true);
          }
        }
      }
    }
    if(scanType === ScannerType.REFERRAL_CODE){
      if (codes.length > 0 && codes[0].value) {
        const { link } = JSON.parse(codes[0].value as string);
        if (link) {
          toggleRedirecting && toggleRedirecting(true);
          Linking.openURL(link);
          toggleRedirecting && toggleRedirecting(false);
        }
      }
    }
    if(scanType === ScannerType.CONTACT_SCAN){
      if (codes.length > 0 && codes[0].value) {
        const { qrType, qiPaymentCode, quaiAddress, username, profilePicture } = JSON.parse(
          value as string,
        );
        if(qrType === 'Contact'){
          //navigate to scanned contact display screen
        }
      }
    }
  }, [])

      // 5. Initialize the Code Scanner to scan QR codes and Barcodes
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: onCodeScanned,
  })

  const showCodeAlert = (value: string, onDismissed: () => void): void => {
    const buttons: AlertButton[] = [
      {
        text: 'Close',
        style: 'cancel',
        onPress: onDismissed,
      },
    ]
    if (value.startsWith('http')) {
      buttons.push({
        text: 'Open URL',
        onPress: () => {
          Linking.openURL(value)
          onDismissed()
        },
      })
    }
    Alert.alert('Scanned Code', value, buttons)
  }

  return (
    <View style={styles.cameraContainer}>
      {device != null && hasPermission && isCameraReady && (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
            torch={torch ? 'on' : 'off'}
          />
          <RNHoleView style={styles.holeView} holes={[styles.squareItem]} />
        </>
      )}
      {!isCameraReady && (
        <>
        <View>
          <Text>Loading Camera</Text>
        </View>
        </>
      )}
      {!hasPermission && (
        <>
        <View>
          <Text>Camera Needs Permission!</Text>
        </View>
        </>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  holeView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.6,
    backgroundColor: styledColors.black,
  },
  squareItem: {
    x: squarePaddingRight,
    y: 80,
    width: squareHoleSize,
    height: squareHoleSize,
    borderRadius: 10,
  },
});
