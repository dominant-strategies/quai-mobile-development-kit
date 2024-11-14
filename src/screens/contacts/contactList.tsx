import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  ContentComponent,
  TextComponent,
  ContactListItem,
  TextButton,
} from 'src/components';

import { Theme } from 'src/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { styledColors } from 'src/styles';

import { useTheme } from 'src/shared/context/themeContext';

import { useIsFocused } from '@react-navigation/native';

import { IUserProfileState } from 'src/store/models/reducers/userProfile';

import { IContactsState } from 'src/store/models/reducers/contacts';
import { ManualAddressModal } from 'src/components/ManualAddressModal';

interface IState {
  userProfileReducer: IUserProfileState;
  contactsReducer: IContactsState;
}

export const ContactsListScreen: React.FC = () => {
  
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);


  const contactsList = useSelector((state: IState) => state.contactsReducer.contactsList,
);
  
  const [refreshingContacts, setRefreshingContacts] = useState(false);
  const isFocused = useIsFocused();

 useEffect(() => {

 }, [isFocused]);

 const onAddContact = () => {
 console.log('add contact');
 }

 const manualAddressModalRef = useRef<BottomSheetModal>(null);
  
 const handlePresentManualAddressModalPress = useCallback(() => {
   manualAddressModalRef.current?.present();
 }, []);
 
  return (
    <ContentComponent title={'Contacts Manager'}>

      <View style={styles.cardWrapper}>
          <TextButton disabled={false} buttonLabel={'Create New Contact'} handleButtonPress={handlePresentManualAddressModalPress}/>
      </View>
      <View style={styles.contactsListWrapper}>
        <View style={styles.contactsListHeader}>
          <TextComponent style={{ color: styledColors.normal }} type="H2">
            Contacts List
          </TextComponent>
        </View>
        {contactsList.length === 0 ? (
         <Text>No Contacts</Text>
        ) : (
            <FlatList
            data={contactsList}
            refreshing={refreshingContacts}
            onRefresh={()=> setRefreshingContacts(true)}
            contentContainerStyle={styles.flatlistContainer}
            onEndReachedThreshold={0.1}
            renderItem={({ item, index }) => (
              <ContactListItem
               contact={item}
               index={index}
              />
            )}
            keyExtractor={item => item.username}
          />
        )}
      </View>
      <ManualAddressModal
              ref={manualAddressModalRef}
              senderUsername='' setAddress={()=> {}} />
    </ContentComponent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    addressButton: {
      backgroundColor: theme.normal,
      width: 210,
    },
    headerBar: {
    marginTop: -40,
    },
    button: {
      height: 32,
      justifyContent: 'center',
      borderRadius: 8,
    },
    buttonWrapper: {
      backgroundColor: theme.surface,
      borderRightWidth: 0,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      flexDirection: 'row',
      padding: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: theme.border,
      height: 40,
    },
    cardWrapper: {
      marginBottom: 10,
      marginTop: 10,
    },
    colorOverwrite: {
      color: styledColors.white,
    },
    earnButton: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: styledColors.gray,
      width: 110,
    },
    filterButton: {
      backgroundColor: theme.surface,
      color: styledColors.gray,
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.border,
      borderRadius: 4,
      height: 25,
      width: 77,
    },
    contactsListHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 2,
    },
    contactsListWrapper: {
      backgroundColor: theme.surface,
      padding: 8,
      marginTop: -30,
    },
    flatlistContainer: {
      // TODO: use flex
      paddingBottom: 280,
      marginBottom: 150,
    },
    searchbarWrapper: {
      marginBottom: 22,
      marginTop: 10,
    },
    backgroundSurface: {
      backgroundColor: theme.background,
    },
  });

