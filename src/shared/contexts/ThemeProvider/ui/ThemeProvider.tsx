import {
  FC, useMemo, useState, createContext,
} from 'react';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ThemeContextProps {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}

export const LOCAL_STORAGE_THEME_KEY = 'theme';

export const ThemeContext = createContext<ThemeContextProps>({});

const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

const ThemeProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const defaultValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={defaultValue}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
