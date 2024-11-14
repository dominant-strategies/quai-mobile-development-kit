import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {styledColors} from 'src/styles';
interface ITextButtonProps {
  disabled: boolean;
  buttonLabel: string;
  handleButtonPress?: () => void;
}

export const TextButton: React.FC<ITextButtonProps> = ({ disabled, buttonLabel, handleButtonPress }: ITextButtonProps)=> {
   
    const opacityStyle = disabled ? 0.2 : 1.0;
  
    return (
        <View style={styles.nextButton}>
        <TouchableOpacity
          style={[{ opacity: opacityStyle }, styles.button]}
          onPress={handleButtonPress}
          disabled={disabled}>
          <Text style={[{ opacity: opacityStyle }, styles.textStyle]}>
            {buttonLabel}
          </Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      height: 60,
      paddingVertical: 0,
      marginHorizontal: 20,
      marginVertical: 20,
    },
    nextButton: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      bottom: 10,
      marginTop: 10,
    },
    textStyle: {
      color: styledColors.normal,
      fontSize: 18,
      lineHeight: 24,
      paddingHorizontal: 20,
     
    },
    icon: {
      marginRight: -2,
      marginTop: -2,
    },
  });
