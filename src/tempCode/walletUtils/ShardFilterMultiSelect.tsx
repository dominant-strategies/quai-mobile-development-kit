import { Pressable, StyleSheet, View } from 'react-native';
import { TextComponent } from 'src/components';
import Done from 'src/shared/assets/done.svg';
import GreyDone from 'src/shared/assets/greyDone.svg';
import React from 'react';
import { Theme, Wallet, Zone } from 'src/types';
import { useThemedStyle } from 'src/shared/hooks';
import { allNodeData } from 'src/constants/nodeData';
import { abbreviateAddress } from 'src/quai-mdk/addressUtils';

type SelectableCardsProps = {
  setShards: (shard: number[]) => void;
  shards: number[];
  walletObject: Record<Zone, Wallet>;
};

const shardNames = Object.keys(allNodeData)
  .filter((key: string) => key.includes('zone'))
  .map((key: string) => allNodeData[key].name);

export const ShardFilterMultiSelect: React.FC<SelectableCardsProps> = ({
  setShards,
  shards,
  walletObject,
}) => {
  const styles = useThemedStyle(themedStyle);
  return (
    <View>
      {shardNames.map((shardName: string, ind: number) => {
        const isSelected = shards.includes(ind);
        const areAllSelected = shards.length === 9;
        return (
          <Pressable
            key={ind}
            onPress={() => {
              if (isSelected) {
                if (shards.length === 1) {
                  setShards([0, 1, 2, 3, 4, 5, 6, 7, 8]);
                } else if (areAllSelected) {
                  setShards([ind]);
                } else {
                  setShards(shards.filter(shard => shard !== ind));
                }
              } else {
                setShards([...shards, ind]);
              }
            }}
          >
            <View
              style={
                isSelected && !areAllSelected
                  ? [styles.card, styles.cardSelected]
                  : styles.card
              }
            >
              <View style={styles.leftColumn}>
                {isSelected && !areAllSelected ? (
                  <Done width={20} height={20} />
                ) : (
                  <GreyDone width={20} height={20} />
                )}
                <View style={styles.leftText}>
                  <TextComponent
                    type="H3"
                    style={
                      areAllSelected
                        ? styles.text
                        : isSelected
                        ? styles.textSelected
                        : styles.text
                    }
                  >
                    {shardName}
                  </TextComponent>
                  <TextComponent themeColor="secondary">
                    {abbreviateAddress(walletObject[Zone['zone-0-0']].address)}
                  </TextComponent>
                </View>
              </View>
              <View style={styles.rightText}>
                <TextComponent
                  type="H3"
                  style={
                    areAllSelected
                      ? styles.text
                      : isSelected
                      ? styles.textSelected
                      : styles.text
                  }
                >
                  XXXX Quai
                </TextComponent>
                <TextComponent themeColor="secondary">$0.00</TextComponent>
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    // TODO: add box shadow
    card: {
      alignItems: 'center',
      borderColor: theme.border,
      borderRadius: 4,
      borderWidth: 2,
      flexDirection: 'row',
      height: 72,
      marginVertical: 4,
      justifyContent: 'space-between',
      paddingHorizontal: 8,
    },
    cardSelected: {
      borderColor: theme.normal,
      borderRadius: 4,
    },
    text: {
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
