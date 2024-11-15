import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { TextComponent } from './TextComponent';

import { Colors, Theme, Typography } from 'src/types';
import { styledColors } from 'src/styles';
import { useThemedStyle } from 'src/shared/hooks';

type ButtonComponentType = 'default' | 'secondary';

interface ButtonComponentStyle {
  backgroundColor: string;
  textColor: string;
  disabled: Omit<ButtonComponentStyle, 'disabled' | 'outlined'>;
  outlined: Omit<ButtonComponentStyle, 'outlined'>;
}

interface ButtonComponentProps extends Omit<PressableProps, 'style'> {
  /*
   * Color to use for button's background instead of the one on typed style
   */
  bgColor?: Colors;
  /*
   * Whether to use style as outline rather than background, which mainly adds border to it
   */
  outlined?: boolean;
  /*
   * Whether to use pill shaped button (more rounded corners)
   */
  pill?: boolean;
  /*
   * SVG icon to be rendered alongside the title
   */
  RightIcon?: React.ReactNode;
  /*
   * Custom style props to overwrite any style that is applied to button's component
   */
  style?: StyleProp<ViewStyle>;
  /*
   * Custom style props to overwrite any style that is applied to button's container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /*
   * Text string to use as title for the button
   */
  title: string;
  /*
   * Type of styling of the component to be used
   */
  type?: ButtonComponentType;
  /*
   * Color to use for title's color instead of the one on typed style
   */
  titleColor?: Colors;
  /*
   * Typography to be used on title's component instead of the one on typed style
   */
  titleType?: Typography;
  /*
   * Underline title on button
   */
  underline?: boolean;
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({
  title,
  bgColor,
  titleColor,
  RightIcon,
  style,
  containerStyle,
  outlined = false,
  pill = false,
  type = 'default',
  titleType = 'H3',
  underline = false,
  ...props
}) => {
  const buttonStyles = useThemedStyle(t =>
    buttonStylesByType[type](t, titleColor),
  );
  const styles = stylesByType(buttonStyles, props.disabled ?? false);
  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        {...props}
        style={({ pressed }) => [
          styles.button,
          RightIcon ? styles.row : {},
          pill && styles.pill,
          outlined && styles.outlinedButton,
          titleColor && outlined && { borderColor: styledColors[titleColor] },
          bgColor && { backgroundColor: styledColors[bgColor] },
          pressed && styles.opacity50,
          style,
        ]}
      >
        <TextComponent
          type={titleType}
          underline={underline}
          style={[
            styles.text,
            outlined && styles.outlinedText,
            titleColor && { color: styledColors[titleColor] },
          ]}
        >
          {title}
        </TextComponent>
        {RightIcon ? RightIcon : null}
      </Pressable>
    </View>
  );
};

const stylesByType = (ref: ButtonComponentStyle, disabled?: boolean) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    opacity50: {
      opacity: 0.5,
    },
    button: {
      gap: 8,
      padding: 16,
      borderRadius: 8,
      backgroundColor: disabled
        ? ref.disabled.backgroundColor
        : ref.backgroundColor,
      justifyContent: 'center',
    },
    pill: {
      borderRadius: 60,
    },
    text: {
      color: disabled ? ref.disabled.textColor : ref.textColor,
    },
    outlinedButton: {
      borderWidth: 1,
      borderColor: disabled
        ? ref.outlined.disabled.textColor
        : ref.outlined.textColor,
      backgroundColor: disabled
        ? ref.outlined.disabled.backgroundColor
        : ref.outlined.backgroundColor,
    },
    outlinedText: {
      color: disabled
        ? ref.outlined.disabled.textColor
        : ref.outlined.textColor,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

const buttonStylesByType: Record<
  ButtonComponentType,
  (theme: Theme, color?: Colors) => ButtonComponentStyle
> = {
  default: (theme: Theme) => ({
    backgroundColor: theme.normal,
    textColor: styledColors.white,
    disabled: {
      backgroundColor: styledColors.lightGray,
      textColor: styledColors.gray,
    },
    outlined: {
      disabled: {
        backgroundColor: 'transparent',
        textColor: styledColors.gray,
      },
      backgroundColor: 'transparent',
      textColor: theme.normal,
    },
  }),
  secondary: (theme: Theme, color?: Colors) => ({
    backgroundColor: 'transparent',
    textColor: color ? color : theme.primary,
    disabled: {
      backgroundColor: 'transparent',
      textColor: theme.border,
    },
    outlined: {
      backgroundColor: 'transparent',
      textColor: color ? color : theme.primary,
      disabled: {
        backgroundColor: 'transparent',
        textColor: theme.border,
      },
    },
  }),
};
