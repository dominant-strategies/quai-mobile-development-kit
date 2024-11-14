import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  BottomSheetModalComponent,
  ButtonComponent,
  SelectableCards,
  TextComponent,
} from 'src/components';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Theme, Wallet, Zone } from 'src/types';
import { useThemedStyle } from 'src/shared/hooks';
import { styledColors } from 'src/styles';
import { useTheme } from 'src/shared/context/themeContext';
import { ShardFilterMultiSelect } from 'src/tempCode/walletUtils/ShardFilterMultiSelect';
import { useTranslation } from 'react-i18next';

type FilterModalProps = {
  setSelectedTxDirection: (selectedTxDirection?: string) => void;
  setSelectedTimeframe: (selectedTimeframe?: string) => void;
  setMinAmount: (minAmount: number) => void;
  setMaxAmount: (maxAmount: number) => void;
  setShards: (shards: number[]) => void;
  walletObject: Record<Zone, Wallet>;
};

export const FilterModal = forwardRef<BottomSheetModal, FilterModalProps>(
  (
    {
      setSelectedTxDirection,
      setSelectedTimeframe,
      setMinAmount,
      setMaxAmount,
      setShards,
      walletObject,
    },
    ref,
  ) => {
    const { t } = useTranslation('translation', { keyPrefix: 'wallet' });
    const { theme } = useTheme();
    const [txDirectionIndex, setTxDirectionIndex] = useState<
      number | undefined
    >();
    const [timeframeIndex, setTimeframeIndex] = useState<number | undefined>();
    const [minAmountIn, setMinAmountIn] = useState('');
    const [maxAmountIn, setMaxAmountIn] = useState('');
    const [shardIndices, setShardIndices] = useState<number[]>([
      0, 1, 2, 3, 4, 5, 6, 7, 8,
    ]);

    const txDirection = useMemo(() => ['from', 'to'], []);

    const timeframe = useMemo(
      () => [
        t('allTime'),
        t('week'),
        t('month'),
        t('quarter'),
        t('semester'),
        t('year'),
      ],
      [],
    );

    const applyFilters = useCallback(() => {
      // @ts-ignore
      setSelectedTxDirection(txDirection[txDirectionIndex]);
      // @ts-ignore
      setSelectedTimeframe(timeframe[timeframeIndex]);
      setMinAmount(Number(minAmountIn));
      setMaxAmount(Number(maxAmountIn));
      setShards(shardIndices);
    }, [
      txDirectionIndex,
      timeframeIndex,
      minAmountIn,
      maxAmountIn,
      shardIndices,
    ]);

    const clearFilters = useCallback(() => {
      setSelectedTxDirection(undefined);
      setTxDirectionIndex(undefined);
      setSelectedTimeframe(undefined);
      setTimeframeIndex(undefined);
      setMinAmount(0);
      setMinAmountIn('');
      setMaxAmount(1e18);
      setMaxAmountIn('');
      setShards([0, 1, 2, 3, 4, 5, 6, 7, 8]);
      setShardIndices([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    }, [
      txDirectionIndex,
      timeframeIndex,
      minAmountIn,
      maxAmountIn,
      shardIndices,
    ]);

    const styles = useThemedStyle(themedStyle);

    return (
      <BottomSheetModalComponent ref={ref}>
        <View style={styles.wrapper}>
          <View style={styles.titleWrapper}>
            <TextComponent type="H3" style={styles.title}>
              {t('filter')}
            </TextComponent>
          </View>
          <ScrollView
            style={{ height: Dimensions.get('window').height * 0.65 }}
          >
            <TextComponent type="H3" style={styles.heading}>
              {t('paymentDirection')}
            </TextComponent>
            <SelectableCards
              index={txDirectionIndex}
              options={['Payment Received', 'Payment Sent']}
              setIndex={setTxDirectionIndex}
            />
            <TextComponent type="H3" style={styles.heading}>
              {t('byDate')}
            </TextComponent>
            <SelectableCards
              index={timeframeIndex}
              options={timeframe}
              setIndex={setTimeframeIndex}
            />
            <TextComponent type="H3" style={styles.heading}>
              {t('byAmount')}
            </TextComponent>
            <View style={styles.amountWrapper}>
              <TextInput
                onChangeText={setMinAmountIn}
                keyboardType="numeric"
                placeholderTextColor={theme.secondary}
                placeholder={`$ ${t('minimum')}`}
                style={styles.amountInput}
                value={minAmountIn}
              />
              <TextComponent themeColor="secondary" type="bold">
                {t('toAmount')}
              </TextComponent>
              <TextInput
                onChangeText={setMaxAmountIn}
                keyboardType="numeric"
                placeholderTextColor={theme.secondary}
                placeholder={`$ ${t('maximum')}`}
                style={styles.amountInput}
                value={maxAmountIn}
              />
            </View>
            <TextComponent type="H3" style={styles.heading}>
              Shard
            </TextComponent>
            <ShardFilterMultiSelect
              setShards={setShardIndices}
              shards={shardIndices}
              walletObject={walletObject}
            />
          </ScrollView>
          <View style={styles.buttonsWrapper}>
            <ButtonComponent
              title={t('applyFilters')}
              containerStyle={styles.applyButtonContainer}
              style={styles.button}
              onPress={applyFilters}
            />
            <ButtonComponent
              title={t('reset')}
              containerStyle={styles.clearButtonContainer}
              style={[styles.button, styles.clearButton]}
              type="secondary"
              onPress={clearFilters}
            />
          </View>
        </View>
      </BottomSheetModalComponent>
    );
  },
);

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      padding: 16,
      backgroundColor: theme.surface,
    },
    title: {
      fontSize: 16,
      height: 26,
    },
    titleWrapper: {
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    heading: {
      fontSize: 16,
      marginTop: 32,
      marginBottom: 8,
      textAlign: 'justify',
    },
    amountInput: {
      borderColor: styledColors.lightGray,
      borderRadius: 4,
      borderWidth: 1,
      color: theme.primary,
      height: 40,
      padding: 8,
      width: 150,
    },
    amountWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    buttonsWrapper: {
      width: '100%',
      flexDirection: 'row',
      paddingTop: (Dimensions.get('window').height * 0.15 - 32) / 4,
      justifyContent: 'space-between',
      height: Dimensions.get('window').height * 0.15,
      borderColor: theme.border,
      borderTopWidth: 1,
    },
    applyButtonContainer: {
      width: 220,
    },
    button: {
      height: 32,
      padding: 0,
      justifyContent: 'center',
    },
    clearButtonContainer: { width: 120 },
    clearButton: {
      borderColor: styledColors.gray,
      borderWidth: 1,
    },
  });
