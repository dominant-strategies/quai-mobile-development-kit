import {
  TouchableOpacity,
  StyleSheet,
  View,
  useColorScheme,
  Linking,
  Share,
  Platform,
} from 'react-native';
import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';

import { styledColors } from 'src/styles';

import ChatIcon from 'src/assets/icons/chat.svg';
import UploadIcon from 'src/assets/icons/upload.svg';
import EmailIcon from 'src/assets/icons/email.svg';
import PrinterIcon from 'src/assets/icons/printer.svg';
import ChatWhiteIcon from 'src/assets/icons/chat_white.svg';
import UploadWhiteIcon from 'src/assets/icons/upload_white.svg';
import EmailWhiteIcon from 'src/assets/icons/email_white.svg';
import PrinterWhiteIcon from 'src/assets/icons/printer_white.svg';
import { useSnackBar } from 'src/shared/context/snackBarContext';
import { abbreviateAddress } from 'src/quai-mdk/addressUtils';

type ShareControlProps = {
  share: string;
};

export default function ShareControl({ share }: ShareControlProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'home' });
  const isDarkMode = useColorScheme() === 'dark';
  const { showSnackBar } = useSnackBar();

  const shareAddress = () => {
    Share.share({
      title: t('receive.shareYourAddress') ?? '',
      message: share,
    });
  };

  const copyToClipboard = () => {
    Clipboard.setString(share);
    showSnackBar({
      message: t('receive.copiedToClipboard'),
      moreInfo: abbreviateAddress(share),
      type: 'success',
    });
  };

  const sendEmail = () => {
    Linking.openURL(`mailto:?body=${share}`);
  };

  const sendSMS = () => {
    Linking.openURL(`sms:$${Platform.OS === 'ios' ? '&' : '?'}body=${share}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <TouchableOpacity>
          {isDarkMode ? (
            <PrinterWhiteIcon width={32} height={32} />
          ) : (
            <PrinterIcon width={32} height={32} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <TouchableOpacity onPress={sendEmail}>
          {isDarkMode ? (
            <EmailWhiteIcon width={32} height={32} />
          ) : (
            <EmailIcon width={32} height={32} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <TouchableOpacity onPress={sendSMS}>
          {isDarkMode ? (
            <ChatWhiteIcon width={32} height={32} />
          ) : (
            <ChatIcon width={32} height={32} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <TouchableOpacity onLongPress={copyToClipboard} onPress={shareAddress}>
          {isDarkMode ? (
            <UploadWhiteIcon width={32} height={32} />
          ) : (
            <UploadIcon width={32} height={32} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    width: 32,
    height: 32,
    borderColor: styledColors.gray,
    borderRadius: 16,
    paddingLeft: 'auto',
    paddingRight: 'auto',
    paddingTop: 6,
    marginLeft: 8,
    marginRight: 8,
    alignItems: 'center',
    verticalAlign: 'middle',
    alignContent: 'center',
    paddingVertical: 'auto',
    lineHeight: 32,
  },
});
