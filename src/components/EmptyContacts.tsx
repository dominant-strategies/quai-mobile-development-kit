import React from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TextComponent } from './TextComponent';
import {TextButton} from 'src/components/Buttons/textButton';

interface EmptyContactsProps {
  containerStyle?: StyleProp<ViewStyle>;
  refreshingContacts: boolean;
  onAddContact: () => void;
}

export const EmptyContacts: React.FC<EmptyContactsProps> = ({
  containerStyle,
  refreshingContacts,
  onAddContact,
}) => {

  return (
    <View style={styles.container}>
        <View style={styles.imageHolder}>
        <Image style={styles.image} source={require('src/assets/noTransactions.png')}/>
        </View>
      {!refreshingContacts && 
      <>
      <TextComponent type="H2">
            You have no contacts saved.
          </TextComponent>
          <TextButton disabled={false} buttonLabel={'Add New Contact'} handleButtonPress={onAddContact}/>
      </>
      }
      {refreshingContacts &&
        <>
           <TextComponent type="H2">
            refreshing contacts list
          </TextComponent>
        </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 250,
      marginTop: 50,
      paddingHorizontal: 0,
      paddingTop: 10,
      alignContent: 'center',
    },
    imageHolder: {
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    },
    image: {
    alignSelf: 'center',
    marginBottom: 20,
    width: 100,
    height: 100,
    },

  });