import { ThemeType, Theme } from 'src/types/Theme';

import { styledColors } from '..';

export const DarkTheme: Theme = {
  type: ThemeType.DARK,
  normal: styledColors.normal,
  primary: styledColors.white,
  secondary: styledColors.white,
  background: styledColors.black,
  surfaceVariant: styledColors.darkGray,
  surface: styledColors.dark,
  border: styledColors.darkGray,
  alert: styledColors.alert,
};
