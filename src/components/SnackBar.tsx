import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  FadeOutDown,
  Layout,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PanGestureHandler } from 'react-native-gesture-handler';

import RedExclamation from 'src/assets/redExclamation.svg';
import Done from 'src/assets/done.svg';

import { TextComponent } from './TextComponent';
import { useSnackBar } from 'src/shared/context/snackBarContext';
import { styledColors } from '../styles';

const ICON_SIZE = 16;
const SNACK_BAR_DURATION = 3000; // 3 seconds
const SWIPE_THRESHOLD = 150;
const Z_INDEX_SNACKBAR = 10;

const SCREEN_WIDTH = Dimensions.get('screen').width;

export type SnackBarType = 'error' | 'success';

const snackBarIconByType: Record<
  SnackBarType,
  React.FC<React.SVGAttributes<SVGElement>>
> = {
  error: RedExclamation,
  success: Done,
};

interface SnackBarProps {
  swipeAnimation?: boolean;
  type?: SnackBarType;
}

export const SnackBar: React.FC<SnackBarProps> = ({
  swipeAnimation = false,
}) => {
  const {
    isOpen,
    snackBar: { type, message, moreInfo },
    closeSnackBar,
  } = useSnackBar();
  const insets = useSafeAreaInsets();
  const translateX = useSharedValue(0);

  const Icon = snackBarIconByType[type];

  // Start timeout closure only if snackbar is open
  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        closeSnackBar();
      }, SNACK_BAR_DURATION);

      return () => {
        timeout && clearTimeout(timeout);
      };
    }
  }, [closeSnackBar, isOpen]);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: event => {
      if (swipeAnimation) {
        translateX.value = event.translationX;
      }
    },
    onEnd: event => {
      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withSpring(SCREEN_WIDTH);
        runOnJS(closeSnackBar)();
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD], [1, 0.2]),
    transform: [
      {
        translateX: translateX.value > 0 ? translateX.value : 0,
      },
    ],
  }));

  return isOpen ? (
    <View style={[styles.container, { bottom: insets.bottom + 16 }]}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          entering={FadeInDown.delay(300)}
          exiting={FadeOutDown}
          layout={Layout.easing(Easing.linear)}
          style={[
            styles.snackBar,
            styles.row,
            styles[`${type}Type`],
            animatedStyle,
          ]}
        >
          <Icon height={ICON_SIZE} width={ICON_SIZE} />
          <TextComponent
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[styles.text, styles.textContainer]}
          >
            <TextComponent
              adjustsFontSizeToFit
              numberOfLines={1}
              type="bold"
              style={styles.text}
            >
              {`${message}`}
            </TextComponent>
            {` ${moreInfo}`}
          </TextComponent>
        </Animated.View>
      </PanGestureHandler>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
  },
  snackBar: {
    backgroundColor: styledColors.alertBackground,
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 8,
    borderRadius: 8,
    marginHorizontal: 20,
    zIndex: 1000 + Z_INDEX_SNACKBAR,
  },
  errorType: {
    backgroundColor: styledColors.alertBackground,
  },
  successType: {
    backgroundColor: styledColors.light,
    borderWidth: 1,
    borderColor: styledColors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: styledColors.black,
  },
  textContainer: {
    width: '90%',
  },
});
