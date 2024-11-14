import React, { forwardRef, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { Theme } from 'src/types';
import Done from 'src/assets/done.svg';
import GreyDone from 'src/assets/greyDone.svg';
import { abbreviateAddress } from 'src/quai-mdk/addressUtils';
import { useThemedStyle } from 'src/shared/hooks';
import { allNodeData } from 'src/quai-mdk/nodeData';
import { useTranslation } from 'react-i18next';

import { BottomSheetModalComponent } from './BottomSheetModal/BottomSheetModal';
import { TextComponent } from './TextComponent';
import { LoaderComponent } from 'src/components/LoaderComponent';
import { IUserProfileState } from 'src/store/models/reducers/userProfile';
import { IActiveWalletAddressState } from 'src/store/models/reducers/wallet';
import { useSelector } from 'react-redux';
import { getAddressForZone, initWalletFromStore } from '../quai-mdk/quaiHDWallet';
import { QuaiHDWallet, Zone } from 'quais';
import { useIsFocused } from '@react-navigation/native';

const zones = Object.keys(Zone) as Zone[];

interface IState {
  userProfileReducer: IUserProfileState;
  activeWalletReducer: IActiveWalletAddressState;
}
interface ActiveAddressModalProps {
  balances?: Record<string, string>;
}

export const ActiveAddressModal = forwardRef<
  BottomSheetModal,
  ActiveAddressModalProps
>((ref) => {
  const styles = useThemedStyle(themedStyle);
  const { t } = useTranslation('translation', { keyPrefix: 'wallet' });
  const [selectedZone, setSelectedZone] = useState<Zone>();
  const activeAddress = useSelector(
    (state: IState) => state.activeWalletReducer.activeWalletAddress,
  );
  const activeZone = useSelector(
    (state: IState) => state.activeWalletReducer.activeWalletAddressZone,
  );
  const isFocused = useIsFocused();

  const [activeQuaiHDWallet, setActiveQuaiHDWallet] = useState<QuaiHDWallet | undefined>(undefined)

  const getAddress = (zone:Zone) => {
    getAddressForZone(zone);
    return activeAddress;
  }

  useEffect(() => {

      const newWallet:any =
        () => new Promise((resolve) => {
            initWalletFromStore().then((_result) => {
                resolve(_result)
                if(newWallet instanceof QuaiHDWallet){
                  setActiveQuaiHDWallet(newWallet);
                  console.log('wallet was fetched');
                }
            });
        })
  }, [isFocused]);


  if (!isFocused) {
    return <LoaderComponent text={t('wallet.loading')} />;
  }

  return (
    <BottomSheetModalComponent ref={ref}>
      <TextComponent style={styles.title} type={'H2'}>{t('chooseAddress')}</TextComponent>
      <ScrollView>
        <View style={styles.wrapper}>
          {zones.map((zone: Zone) => {
            const isSelected = selectedZone === activeZone;
            return (
              <Pressable
                key={zone}
                onPress={() => {
                  if (!isSelected) {
                    setSelectedZone(zone);
                  }
                }}
              >
                <View
                  style={
                    isSelected
                      ? [styles.card, styles.cardSelected]
                      : styles.card
                  }
                >
                  <View style={styles.leftColumn}>
                    {isSelected ? (
                      <Done width={20} height={20} />
                    ) : (
                      <GreyDone width={20} height={20} />
                    )}
                    <View style={styles.leftText}>
                      <TextComponent
                        type="H3"
                        style={
                          isSelected
                            ? [styles.textNotSelected, styles.textSelected]
                            : styles.textNotSelected
                        }
                      >
                        {allNodeData[zone].name}
                      </TextComponent>
                      <TextComponent themeColor="primary">
                        {abbreviateAddress(getAddress(zone))}
                      </TextComponent>
                    </View>
                  </View>
                  <View style={styles.rightText}>
                    <TextComponent
                      type="H3"
                      style={
                        isSelected
                          ? [styles.textNotSelected, styles.textSelected]
                          : styles.textNotSelected
                      }
                    >
                      { '0'}{' '} Quai
                    </TextComponent>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </BottomSheetModalComponent>
  );
});

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      padding: 8,
      backgroundColor: theme.surface,
    },
    title: {
      backgroundColor: theme.surface,
    },
    card: {
      alignItems: 'center',
      borderColor: theme.border,
      borderRadius: 4,
      borderWidth: 2,
      backgroundColor: theme.surface,
      flexDirection: 'row',
      height: 72,
      marginVertical: 4,
      justifyContent: 'space-between',
      paddingHorizontal: 8,
    },
    cardSelected: {
      borderColor: theme.normal,
    },
    textNotSelected: {
      color: theme.primary,
    },
    textSelected: {
      color: theme.normal,
    },
    leftText: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginLeft: 8,
    },
    rightText: {
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    leftColumn: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
