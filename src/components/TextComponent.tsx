import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import { useTheme } from 'src/shared/context/themeContext';
import { ThemeColor, Typography } from 'src/types';
import { typography } from 'src/styles';

interface ITextComponentProps extends TextProps {
  themeColor?: keyof ThemeColor;
  type?: Typography;
  underline?: boolean;
}

export const TextComponent: React.FC<ITextComponentProps> = ({
  children,
  themeColor = 'primary',
  type = 'default',
  underline = false,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const fontStyle = typography[type];

  return (
    <Text
      style={[
        fontStyle,
        { color: theme[themeColor] },
        underline && styles.underline,
        style,
      ]}
      allowFontScaling={false}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline',
  },
});
