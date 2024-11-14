import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useThemedStyle } from 'src/shared/hooks';
import { Contact, Theme } from 'src/types';
import { TextComponent } from 'src/components/TextComponent';
import { styledColors } from 'src/styles';
import { shortAddress } from 'src/quai-mdk/utils';
import { AvatarComponent } from './AvatarComponent';
import Right from 'src/assets/rightChevron.svg';
import { RootNavigator } from 'src/navigation/utils';

type ContactListItemProps = {
  contact: Contact
  index: number,
};

export const ContactListItem: React.FC<ContactListItemProps> = ({
  contact, index
}) => {
  const styles = useThemedStyle(themedStyle);
  const openContact = () => {
    RootNavigator.navigate('SendStack', {
      screen: 'ContactProfile',
      params: {
        qiPaymentCode: contact.qiPaymentCode,
        quaiAddress: contact.quaiAddress,
        username: contact.username,
        profilePicture: contact.profilePicture,
        contactIndex: index,
      },
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.leftBlock}>
      <AvatarComponent
          containerStyle={styles.image}
          iconSize={60}
          profilePicture={contact.profilePicture}
        />
      </View>
      <View style={styles.centreBlock}>
      <TextComponent type="H2">
              {contact.username}
            </TextComponent>
      <TextComponent type="H3">
              Quai Address: {shortAddress(contact.quaiAddress)}
            </TextComponent>
      <TextComponent type="H3">
              Qi Payment Code: {shortAddress(contact.qiPaymentCode)}
            </TextComponent>
      </View>
      <View style = {styles.rightBlock}>
      <Pressable onPress={() => openContact()}>
              <Right />
            </Pressable>
      </View>
      </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      height: 100,
      marginTop: 15,
      backgroundColor: theme.background,
      alignSelf: 'center',
      borderLeftColor: theme.border,
      borderTopColor: theme.border,
      borderLeftWidth:2,
      borderTopWidth: 1,
      borderRightWidth: 2,
      shadowOffset: {
        width: 3,
        height: 4,
      },
      borderBottomRightRadius: 15,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 5,
      borderTopLeftRadius: 5,
      shadowOpacity: 0.8,
      shadowRadius: 3,
      shadowColor: styledColors.gray,
    },
    leftBlock: {
    width: '30%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    },
    centreBlock: {
      width: '60%',
      height: '100%',
      flexDirection: 'column',
      alignContent: 'flex-start',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    rightBlock: {
      width: '10%',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'flex-end',
      alignContent: 'flex-end',
      justifyContent: 'center',
      paddingRight: 10,
    },
    rowContainer: {
      flexDirection: 'row',
      height: '100%',
      width: '100%',
      padding: 5,
    },
    buttonStyle: {

    },
    image: {
      borderWidth: 1,
      borderColor: styledColors.normal,
      borderRadius: 24,
      height: 50,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: styledColors.white,
      marginLeft: 15,
      marginRight: 15,
    },
    wrapper: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: theme.surface,
      marginBottom: 16,
    },
    colorOverwrite: {
      color: styledColors.gray,
    },
    amount: {
      fontSize: 18,
      lineHeight: 18,
      marginVertical: 10,
      color: styledColors.normal,
    },
    txDirection: {
    fontWeight: "800",
    },
    dateText: {
    fontWeight: "900",
    color: 'black',
    },
    address: {
    fontSize: 14,
    fontWeight: "bold",
    color: styledColors.normal,
    },
    separator: {
      flex: 1,
      marginLeft: 0,
    },
  });
