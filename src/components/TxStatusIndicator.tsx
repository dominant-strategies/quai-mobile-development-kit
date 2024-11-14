import Done from 'src/assets/done.svg';
import RedExclamationBig from 'src/assets/redExclamationBig.svg';
import LoaderCircle from 'src/assets/loaderCircle.svg';
import LoaderDots from 'src/assets/loaderDots.svg';
import { TextComponent } from 'src/components';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { styledColors } from 'src/styles';

export enum TxStatus {
  idle = 'idle',
  ready = 'ready',
  processing = 'processing',
  pending = 'pending',
  success = 'success',
  failed = 'failed',
}

type TxStatusIndicatorProps = {
  txStatus: TxStatus;
  txErrorMessage: string;
};

const AnimatedView = Animated.createAnimatedComponent(View);

export const TxStatusIndicator = ({ txStatus }: TxStatusIndicatorProps) => {
  const { t } = useTranslation();

  const rotation = useSharedValue(0);
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  switch (txStatus) {
    case TxStatus.success:
      return (
        <View style={styles.wrapper}>
          <Done />
          <TextComponent type="H1" style={styles.text}>
            {t('home.send.paymentConfirmed')}
          </TextComponent>
        </View>
      );
      case TxStatus.ready:
        return (
          <View style={styles.wrapper}>
            <View style={styles.loaderWrapper}>
              <AnimatedView style={[styles.loaderCircle, animatedStyle]}>
                <LoaderCircle />
              </AnimatedView>
              <View style={styles.loaderDots}>
                <LoaderDots />
              </View>
            </View>
            <TextComponent
              type="H1"
              style={[styles.text, { color: styledColors.gray }]}
            >
              ready to send payment
            </TextComponent>
          </View>
        );
    case TxStatus.processing:
      return (
        <View style={styles.wrapper}>
          <View style={styles.loaderWrapper}>
            <AnimatedView style={[styles.loaderCircle, animatedStyle]}>
              <LoaderCircle />
            </AnimatedView>
            <View style={styles.loaderDots}>
              <LoaderDots />
            </View>
          </View>
          <TextComponent
            type="H1"
            style={[styles.text, { color: styledColors.gray }]}
          >
            processing...
          </TextComponent>
        </View>
      );
    case TxStatus.failed:
      return (
        <View style={styles.wrapper}>
          <RedExclamationBig />
          <TextComponent type="H1" style={styles.text}>
            {t('home.send.paymentFailed')}
          </TextComponent>
        </View>
      );
    default:
      return (
        <View style={styles.wrapper}>
          <View style={styles.loaderWrapper}>
            <AnimatedView style={[styles.loaderCircle, animatedStyle]}>
              <LoaderCircle />
            </AnimatedView>
            <View style={styles.loaderDots}>
              <LoaderDots />
            </View>
          </View>
          <TextComponent
            type="H1"
            style={[styles.text, { color: styledColors.gray }]}
          >
            {t('home.send.paymentPending')}
          </TextComponent>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 16,
  },
  wrapper: {
    alignItems: 'center',
  },
  loaderWrapper: {
    position: 'relative',
    alignItems: 'center',
    height: 100,
  },
  loaderCircle: {
    position: 'absolute',
  },
  loaderDots: {
    position: 'absolute',
  },
});
