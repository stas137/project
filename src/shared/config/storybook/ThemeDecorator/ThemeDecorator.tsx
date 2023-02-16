import { Story } from '@storybook/react';
import 'app/styles/index.scss';
import { Theme } from 'shared/contexts/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
  <div className={`app ${theme}`}>
    <StoryComponent />
  </div>
);
