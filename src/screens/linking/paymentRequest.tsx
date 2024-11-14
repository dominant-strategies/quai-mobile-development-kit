import React, { useEffect } from 'react';
import {
    Linking,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';

import {
  ContentComponent,
} from 'src/components';

import { buttonStyle, fontStyle, styledColors } from 'src/styles';

import { LinkingStackParamList } from 'src/navigation/stacks/LinkingStack';
import { RootNavigator } from 'src/navigation/utils';
import {TextButton} from 'src/components/Buttons/textButton';

type PaymentReqLinkProps = NativeStackScreenProps<
  LinkingStackParamList,
  'RequestLink'
>;

function PaymentReqLinkScreen({ route, navigation }: PaymentReqLinkProps) {
  const { t } = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      console.log(`url`, url);
      if(url) {
      const parsed = queryString.parseUrl(url);
      let reqObject = {
        username: '',
        address: '',
        amount: 0,
        token: ''
      };
      if(parsed.query.username) {
        reqObject.username = parsed.query.username as string; 
      }
      if(parsed.query.address) {
        reqObject.address = parsed.query.address as string;
      }
      if(parsed.query.amount) {
        let num = Number(parsed.query.amount)
        reqObject.amount = num;
      }
      RootNavigator.navigate('SendStack', {
        screen: 'SendAmount',
        params: {
          amount: reqObject.amount,
          currency: reqObject.token,
          qiPaymentCode: reqObject.address,
          quaiAddress: reqObject.address,
          receiverUsername: reqObject.username,
          sender: "test",
        },
      });
    }
    });
  }, []);
  
  const send = () => {
 
    console.log('user', route.params.username);
    RootNavigator.navigate('SendStack', {
        screen: 'SendAmount',
        params: {
          amount: 0,
          currency: 'QUAI',
          quaiAddress: "",
          qiPaymentCode: "",
          // TODO: replace address to generate blockie with walletObject[zone] when setup
          receiverUsername: '',
          sender: "test",
        },
      });
  
  };
  return (
    <ContentComponent hasBackgroundVariant title={t('home.send.label')}>
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.container}>
            <Text>PAY ME NOW!</Text>
            <TextButton disabled={false} buttonLabel={'pay now'} handleButtonPress={send}/>
        </ScrollView>
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

export default PaymentReqLinkScreen;
