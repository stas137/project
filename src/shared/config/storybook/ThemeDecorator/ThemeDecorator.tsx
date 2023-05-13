import { Story } from '@storybook/react';
// eslint-disable-next-line project-path-checker-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';

// eslint-disable-next-line project-path-checker-plugin/layer-imports
import '@/app/styles/index.scss';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) =>
  (
    <ThemeProvider initialTheme={theme}>
      <div className={`app ${theme}`}>
        <StoryComponent />
      </div>
    </ThemeProvider>
  );
