import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';

import {
  ButtonComponent,
  ContentComponent,
  TextComponent,
} from 'src/components';
import { Zone } from 'src/types';
import { regionImgs, zoneRegionMap } from 'src/assets/regions';
import { typography } from 'src/styles';
import { useTheme } from 'src/shared/context/themeContext';
import { useDispatch } from 'react-redux';
import * as userProfileActions from 'src/store/actions/userProfileActions';


import { OnboardingStackScreenProps } from 'src/navigation/stacks/OnboardingStack';

const INITIAL_ZONE = Zone['zone-0-0'];

const isWindowSmallerThanScreen =
  Dimensions.get('window').height < Dimensions.get('screen').height;

export const SetupLocationScreen: React.FC<
  OnboardingStackScreenProps<'SetupLocation'>
> = ({ navigation }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.setup.location',
  });
  const { theme } = useTheme();
  const { t: tCommon } = useTranslation('translation', { keyPrefix: 'common' });
  const [selectedZone, setSelectedZone] = useState(INITIAL_ZONE);
  const dispatch = useDispatch();
  
  const setupLocation = () => {
    const znstr = selectedZone.toString();
    dispatch(userProfileActions.setUserHomeZone(znstr));
    navigation.navigate('OnboardingTerms');
  };

  return (
    <ContentComponent hasBackgroundVariant containerStyle={styles.mainContainer}>
      <ScrollView
        alwaysBounceVertical={isWindowSmallerThanScreen}
        showsVerticalScrollIndicator={false}
      >
        <TextComponent type="H1">{t('title')}</TextComponent>
        <TextComponent style={styles.description}>{t('description')}</TextComponent>
        <View style={styles.separator} />
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={regionImgs[zoneRegionMap[selectedZone]]}
          />
        </View>
        <Picker
          mode="dropdown"
          selectedValue={selectedZone}
          itemStyle={{ ...styles.pickerItem, color: theme.primary }}
          onValueChange={item => setSelectedZone(item)}
        >
          {Object.values(Zone).map((item, idx) => (
            <Picker.Item
              key={idx}
              label={zoneRegionMap[item]}
              value={item}
              color={item === selectedZone ? theme.normal : theme.primary}
              style={styles.pickerItem}
            />
          ))}
        </Picker>
        <View style={styles.separator} />
        <ButtonComponent
          title={tCommon('continue')}
          onPress={setupLocation}
          style={styles.continueButton}
        />
        <View style={styles.separator} />
      </ScrollView>
    </ContentComponent>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
  },
  description: {
    marginVertical: 16,
    marginHorizontal: 32,
  },
  imageContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    height: undefined,
    aspectRatio: 359 / 182,
  },
  continueButton: {
    marginVertical: 16,
  },
  separator: {
    flex: 1,
  },
  pickerItem: {
    ...typography.H3,
  },
});
