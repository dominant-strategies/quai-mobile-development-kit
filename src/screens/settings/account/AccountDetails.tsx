import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  AvatarComponent,
  ButtonComponent,
  LoaderComponent,
  SettingsContent,
  TextComponent,
} from 'src/components';
import { useTranslation } from 'react-i18next';
import {
  useThemedStyle,
} from 'src/shared/hooks';
import { Theme } from 'src/types';
import Link from 'src/assets/link.svg';
import { IUserProfileState } from 'src/store/models/reducers/userProfile';
import { IActiveWalletAddressState } from 'src/store/models/reducers/wallet';
import { useDispatch, useSelector } from 'react-redux';
import * as userProfileActions from 'src/store/actions/userProfileActions';

interface IState {
  userProfileReducer: IUserProfileState;
  activeWalletReducer: IActiveWalletAddressState;
}

export const AccountDetails = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.details',
  });
  const styles = useThemedStyle(themedStyle);

  const activeAddress = useSelector(
    (state: IState) => state.activeWalletReducer.activeWalletAddress,
  );
  const username = useSelector(
    (state: IState) => state.userProfileReducer.userName,
  );
  const profilePicture = useSelector(
    (state: IState) => state.userProfileReducer.userAvatar,
  );

  const [loading, setLoading] = useState(false);
  const [usernameInput, setUsernameInput] = useState(username);
  const [profilePictureInput, setProfilePictureInput] = useState(profilePicture, // check if it's blockie or not
  );
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('USD');
  const [items, setItems] = useState([
    { label: 'USD - United States Dollar', value: 'USD' },
  ]);
  const dispatch = useDispatch();

  const handleSave = useCallback(async () => {
    setLoading(true);
    if(profilePictureInput){
    dispatch(userProfileActions.setUserAvatar(profilePictureInput)); // change to blockie
    }
    if(usernameInput){
    dispatch(userProfileActions.setUserName(usernameInput));
    }
    setLoading(false);
  }, [usernameInput, profilePictureInput]);

  if (!profilePicture || !username || loading) {
    return <LoaderComponent text={t('loading')} />;
  }

  return (
    <SettingsContent title={t('accountDetails')}>
      <AvatarComponent
        containerStyle={styles.avatarContainer}
        profilePicture={profilePicture}
      />
      <View style={styles.container}>
        <TextComponent type="H3">{t('displayName')}</TextComponent>
        <TextInput
          placeholder={t('placeholder.username') ?? ''}
          style={styles.input}
          onChangeText={setUsernameInput}
        >
          {usernameInput}
        </TextInput>
        <TextComponent type="H3">{t('linkPFP')}</TextComponent>
        <View style={styles.iconInput}>
          <Link />
          <TextInput
            placeholder={t('placeholder.profilePicture') ?? ''}
            style={[styles.input, styles.narrowInput]}
            onChangeText={setProfilePictureInput}
          >
            {profilePictureInput}
          </TextInput>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TextComponent type="H3">{t('localCurrency')}</TextComponent>
        <TextComponent>{t('selectCurrency')}</TextComponent>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={[styles.input, styles.dropdownInput]}
          dropDownContainerStyle={[styles.input, styles.dropdownInput]}
          textStyle={styles.dropdownText}
        />
        <ButtonComponent title={t('save')} onPress={handleSave} />
      </View>
    </SettingsContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    avatarContainer: { paddingTop: 24 },
    container: {
      paddingHorizontal: 16,
      alignItems: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    input: {
      borderColor: theme.border,
      borderRadius: 4,
      borderWidth: 1,
      color: theme.primary,
      height: 32,
      marginVertical: 8,
      padding: 8,
      width: Dimensions.get('window').width - 32,
    },
    narrowInput: {
      marginLeft: 8,
      width: Dimensions.get('window').width - 64,
    },
    bottomContainer: {
      alignItems: 'flex-start',
      padding: 16,
    },
    dropdownInput: {
      backgroundColor: theme.surface,
      height: 48,
      marginTop: 16,
      marginBottom: 48,
      padding: 0,
    },
    dropdownText: {
      color: theme.primary,
    },
    iconInput: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
  });
