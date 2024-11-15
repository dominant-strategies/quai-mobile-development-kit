import React, { useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

import { createCtx } from '.';
import { Theme, ThemeType } from 'src/types/Theme';
import { DarkTheme } from 'src/styles/theming/DarkTheme';
import { LightTheme } from 'src/styles/theming/LightTheme';

// State variables only
interface ThemeContextState {
  theme: Theme;
  isDarkMode: boolean;
}

// This interface differentiates from State
// because it holds any other option or fx
// that handle the state in some way
interface ThemeContext extends ThemeContextState {}

const [useContext, ThemeContextProvider] =
  createCtx<ThemeContext>('themeContext');

interface ProviderProps {
  children?: React.ReactNode;
}

export const ThemeProvider = React.memo<ProviderProps>(({ children }) => {
  //const isDarkMode = useColorScheme() === ThemeType.DARK;
  const isDarkMode = useColorScheme() === ThemeType.DARK;
 // const theme = isDarkMode ? DarkTheme : LightTheme;
 const theme = LightTheme;

  const [themeCtxState, setCtxTheme] = useState<ThemeContextState>({
    theme,
    isDarkMode,
  });

  useEffect(() => {
    setCtxTheme({
      theme: isDarkMode ? DarkTheme : LightTheme,
      isDarkMode,
    });
  }, [isDarkMode]);

  const memoValue = useMemo(() => {
    return {
      ...themeCtxState,
    } as ThemeContext;
  }, [themeCtxState]);

  return (
    <ThemeContextProvider value={memoValue}>{children}</ThemeContextProvider>
  );
});

export const useTheme = useContext;
