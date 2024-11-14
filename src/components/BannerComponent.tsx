import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextComponent } from 'src/components/TextComponent';
import RedExclamation from 'src/assets/redExclamation.svg';
import { styledColors } from 'src/styles';

type BannerComponentProps = {
  boldText: string;
  showError: boolean;
  text: string;
};

export const BannerComponent = ({
  boldText,
  showError,
  text,
}: BannerComponentProps) => {
  return (
    <View style={[styles.wrapper, !showError && styles.hiddenBanner]}>
      <RedExclamation />
      <TextComponent type="bold" themeColor="alert">
        &nbsp;{boldText}
      </TextComponent>
      <TextComponent themeColor="alert">&nbsp;{text}</TextComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: styledColors.alertBackground,
    borderColor: styledColors.alert,
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderRadius: 4,
    paddingVertical: 8,
    height: 34,
  },
  hiddenBanner: {
    opacity: 0,
  },
});
