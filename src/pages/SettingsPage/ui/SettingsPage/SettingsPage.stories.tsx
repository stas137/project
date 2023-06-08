import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { Theme } from 'shared/contexts/ThemeProvider';

import SettingsPage from './SettingsPage';

export default {
  title: 'pages/SettingsPage',
  component: SettingsPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SettingsPage>;

const Template: ComponentStory<typeof SettingsPage> = (args) => (
  <SettingsPage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
// Primary.decorators = [ThemeDecorator(Theme.LIGHT)];
