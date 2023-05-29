import { addDecorator } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
// import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../src/shared/const/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  themes: {
    default: 'light',
    list: [
      { name: 'light', class: ['app', Theme.LIGHT], color: '#D4E2E6' },
      { name: 'dark', class: ['app', Theme.DARK], color: '#4FC3EA' },
      { name: 'orange', class: ['app', Theme.ORANGE], color: '#bd5012' },
    ],
  },
};

addDecorator(StyleDecorator);
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
// addDecorator(ThemeDecorator(Theme.LIGHT));
