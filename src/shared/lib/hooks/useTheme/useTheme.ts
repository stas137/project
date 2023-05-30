import { useContext } from 'react';

import { ThemeContext } from '../../context/ThemeContext';
import { Theme } from '../../../const/theme';

interface UseThemeReturn {
  theme: Theme;
  toggleTheme: (saveAction?: (theme: Theme) => void) => void;
}

export function useTheme(): UseThemeReturn {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = (saveAction?: (theme: Theme) => void) => {
    let newTheme: Theme;

    switch (theme) {
      case Theme.DARK:
        newTheme = Theme.LIGHT;
        break;
      case Theme.LIGHT:
        newTheme = Theme.ORANGE;
        break;
      case Theme.ORANGE:
        newTheme = Theme.DARK;
        break;
      default:
        newTheme = Theme.LIGHT;
        break;
    }

    // document.body.className = newTheme;

    // localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);

    saveAction?.(newTheme);

    setTheme?.(newTheme);
  };

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  };
}
