import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

import {
  CameraComponent,
  ContentComponent,
  ScannerType,
} from 'src/components';

const ContactScanScreen: React.FC = () => {


  return (
    <ContentComponent noNavButton hasBackgroundVariant>
      <View style={styles.scanContainer}>
      <CameraComponent scanType={ScannerType.CONTACT_SCAN} />
      </View>
    </ContentComponent>
  );
};

export default ContactScanScreen;

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
