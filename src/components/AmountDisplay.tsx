import React from 'react';
import { TextComponent } from './TextComponent';
import { TextProps } from 'react-native';

interface AmountDisplayProps extends TextProps {
  prefix?: string;
  suffix?: string;
  value: string;
}

// TODO: Tweak L&F to follow design
export const AmountDisplay: React.FC<AmountDisplayProps> = ({
  prefix,
  value,
  suffix,
  style,
}) => {
  return (
    <TextComponent type="H1" allowFontScaling style={style}>
      {prefix}
      {value}
      {suffix}
    </TextComponent>
  );
};
