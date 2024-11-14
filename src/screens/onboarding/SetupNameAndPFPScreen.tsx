import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import makeBlockie from 'ethereum-blockies-base64';
import PersonOutlineIcon from 'src/assets/personOutline.svg';
import RefreshIcon from 'src/assets/refresh.svg';
import {
  AvatarComponent,
  ButtonComponent,
  ContentComponent,
  TextComponent,
} from 'src/components';
import { MIN_HEIGHT_CONTENT_HEADER } from 'src/components/ContentComponent';
import {
  useThemedStyle,
} from 'src/shared/hooks';
import { Theme, Zone } from 'src/types';
import { useTheme } from 'src/shared/context/themeContext';

import { OnboardingStackScreenProps } from 'src/navigation/stacks/OnboardingStack';
import { RootNavigator } from 'src/navigation/utils';

import * as userProfileActions from 'src/store/actions/userProfileActions';
import { IUserProfileState } from 'src/store/models/reducers/userProfile';
import { IPrimaryWalletState } from 'src/store/models/reducers/wallet';
import * as qiWalletActions from 'src/store/actions/qiWalletActions';

const PFPURLPlaceholder =
  'https://www.pngfind.com/pngs/m/616-6168267_personblack-jack-kicking-at-camera-jack-black-transparent.png';
const indexedZones = Object.values(Zone);

interface state {
  userProfileReducer: IUserProfileState;
  primaryWalletReducer: IPrimaryWalletState;
};

export const SetupNameAndPFPScreen: React.FC<
  OnboardingStackScreenProps<'SetupNameAndPFP'>
> = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.setup.nameAndPFP',
  });
  const { t: tCommon } = useTranslation('translation', { keyPrefix: 'common' });
  const [username, setUsername] = useState('');
  const styles = useThemedStyle(themedStyle);
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [currentWalletIndex, setCurrentWalletIndex] = useState(0);

  const dispatch = useDispatch();
  const walletAddress = useSelector((state: state) => (state.primaryWalletReducer.primaryWalletPublicAddress));

  const walletBlockie = walletAddress ? 
     makeBlockie(walletAddress)
     : PFPURLPlaceholder;
  
  const onRefreshButton = () =>
    setCurrentWalletIndex(prevState =>
      prevState + 1 < indexedZones.length ? prevState + 1 : 0,
    );

  const saveUserName = () => {
    dispatch(userProfileActions.setUserAvatar(PFPURLPlaceholder)); // change to blockie
    dispatch(userProfileActions.setUserName(username));
    dispatch(userProfileActions.setUserOnboarded(true));
    RootNavigator.goHome();
    setTimeout(() => { 
    dispatch(qiWalletActions.scanQiHDWallet());
    }, 2000);
  };

  return (
    <ContentComponent containerStyle={styles.mainContainer}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        keyboardVerticalOffset={MIN_HEIGHT_CONTENT_HEADER}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.separator} />
        <TextComponent type="H1" style={styles.title}>
          {t('title')}
        </TextComponent>
        <View style={styles.separator} />
        <AvatarComponent
          profilePicture={walletBlockie}
          bottomRightIcon={ <RefreshIcon />}
          onBottomRightIconPress={onRefreshButton}
        />
        <View style={styles.separator} />
        <View style={styles.row}>
          <PersonOutlineIcon />
          <TextInput
            autoFocus
            style={styles.textInput}
            onChangeText={setUsername}
            placeholder={t('usernamePlaceholder') as string}
            placeholderTextColor={theme.secondary}
            value={username}
          />
        </View>
        <View style={styles.baseline} />
        <View style={styles.doubleSeparator} />
        <ButtonComponent
          disabled={!username}
          title={tCommon('continue')}
          onPress={saveUserName}
          style={{
            ...styles.continueButton,
            marginBottom:
              styles.continueButton.marginBottom + insets.bottom ?? 0,
          }}
        />
      </KeyboardAvoidingView>
    </ContentComponent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      paddingHorizontal: 16,
    },
    keyboardAvoiding: {
      flex: 1,
    },
    title: {
      paddingHorizontal: 40,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    textInput: {
      height: 40,
      color: theme.primary,
    },
    baseline: {
      borderBottomWidth: 2,
      borderColor: theme.normal,
      width: '100%',
      marginBottom: 8,
    },
    continueButton: {
      marginBottom: 32,
    },
    separator: {
      flex: 1,
    },
    doubleSeparator: {
      flex: 2,
    },
  });
