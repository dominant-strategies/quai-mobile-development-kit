import React, { useCallback, useRef } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { MainTabStackScreenProps } from 'src/navigation/stacks/MainStack';
import { Theme } from 'src/types';
import {
  useThemedStyle,
} from 'src/shared/hooks';
import { fontStyle, styledColors } from 'src/styles';
import {
  ButtonComponent,
  LoaderComponent,
  TextComponent,
  TextButton,
} from 'src/components';
import { abbreviateAddress } from 'src/quai-mdk/addressUtils';
import { SettingsLinks } from 'src/components/SettingsLinks';
import { RootNavigator } from 'src/navigation/utils';
import { IUserProfileState } from 'src/store/models/reducers/userProfile';
import { IActiveWalletAddressState } from 'src/store/models/reducers/wallet';
import * as userProfileActions from 'src/store/actions/userProfileActions';

interface IState {
  userProfileReducer: IUserProfileState;
  activeWalletReducer: IActiveWalletAddressState;
}

const SettingsScreen: React.FC<MainTabStackScreenProps<'Settings'>> = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.landing',
  });
  const styles = useThemedStyle(themedStyle);

  const activeAddressModalRef = useRef<BottomSheetModal>(null);
  
  const activeAddress = useSelector(
    (state: IState) => state.activeWalletReducer.activeWalletAddress,
  );
  const username = useSelector(
    (state: IState) => state.userProfileReducer.userName,
  );
  const profilePicture = useSelector(
    (state: IState) => state.userProfileReducer.userAvatar,
  );
  const dispatch = useDispatch();

  const resetState = () => {
    dispatch(userProfileActions.setUserOnboarded(false));
    RootNavigator.landing()
  }

  const handlePresentActiveAddressModalPress = useCallback(() => {
    activeAddressModalRef.current?.present();
  }, []);

  if (!activeAddress) {
    return <LoaderComponent text={'Loading...'} />;
  }

  return (
    <View>
      <View style={styles.top}>
        <Image style={styles.image} source={{ uri: profilePicture }} />
      </View>
      <View style={styles.middle}>
        <TextComponent style={styles.username}>{username}</TextComponent>
        <TextComponent themeColor="secondary">
          {abbreviateAddress(activeAddress)}
        </TextComponent>
      </View>
      <SettingsLinks />
    </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    top: {
      backgroundColor: theme.background,
      height: Dimensions.get('window').height * 0.2,
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
      position: 'relative',
      zIndex: 2,
    },
    middle: {
      backgroundColor: theme.surface,
      paddingHorizontal: 32,
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
    },
    username: {
      ...fontStyle.fontH2,
      fontSize: 20,
      marginTop: 30,
    },
    chooseAddressButtonContainer: {
      width: 200,
    },
    earnButtonContainer: {
      width: 100,
    },
    logoutButtonContainer: {
      width: '80%',
      alignContent: 'center',
    },
    button: {
      height: 32,
      padding: 0,
      justifyContent: 'center',
    },
    earnButton: { borderColor: styledColors.gray, borderWidth: 1 },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 24,
    },
    image: {
      bottom: -30,
      position: 'absolute',
      borderRadius: 70,
      alignSelf: 'center',
      height: 68,
      width: 68,
      borderColor: theme.normal,
      borderWidth: 4,
    },
  });

export default SettingsScreen;
