import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import QRCode, { QRCodeProps } from 'react-native-qrcode-svg';

import { useThemedStyle } from 'src/shared/hooks';
import { Theme } from 'src/types';
import { styledColors } from 'src/styles';

const QR_SIZE = 156;
const LOGO_SIZE = 60;

interface QRCodeComponentProps extends QRCodeProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export const QRCodeComponent: React.FC<QRCodeComponentProps> = ({
  containerStyle,
  logo,
  logoBackgroundColor = 'transparent',
  logoBorderRadius = LOGO_SIZE / 2,
  logoSize = LOGO_SIZE,
  size = QR_SIZE,
  ...props
}) => {
  const styles = useThemedStyle(themedStyles);

  return (
    <View style={[styles.qrCode, ...(containerStyle ? [containerStyle] : [])]}>
      <QRCode
        logo={logo}
        logoSize={logoSize}
        logoBorderRadius={logoBorderRadius}
        logoBackgroundColor={logoBackgroundColor}
        size={size}
        {...props}
      />
    </View>
  );
};

const themedStyles = (theme: Theme) =>
  StyleSheet.create({
    qrCode: {
      padding: 10,
      borderWidth: 1,
      borderRadius: 4,
      backgroundColor: styledColors.white,
      borderColor: theme.border,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  });
