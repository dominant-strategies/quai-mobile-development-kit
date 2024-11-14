import { useMemo } from 'react';

import { Theme } from 'src/types/Theme';
import { useTheme } from 'src/shared/context/themeContext';

type ThemeAwareStyleGenerator<T extends {}> = (theme: Theme) => T;

export const useThemedStyle = <T extends {}>(
  fn: ThemeAwareStyleGenerator<T>,
) => {
  const { theme } = useTheme();

  const ThemedStyle = useMemo(() => fn(theme), [fn, theme]);
  return ThemedStyle;
};
