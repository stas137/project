import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { Theme } from 'shared/contexts/ThemeProvider';

import { AppLink } from './AppLink';

export default {
  title: 'shared/AppLink',
  component: AppLink,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => (
  <AppLink {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: 'Text',
  variant: 'primary',
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   children: 'Text',
//   variant: AppLinkVariant.SECONDARY,
// };

export const Red = Template.bind({});
Red.args = {
  children: 'Text',
  variant: 'red',
};

// export const PrimaryDark = Template.bind({});
// PrimaryDark.args = {
//   children: 'Text',
//   variant: AppLinkTheme.PRIMARY,
// };
// PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
