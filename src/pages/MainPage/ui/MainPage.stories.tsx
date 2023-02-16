import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { Theme } from 'shared/contexts/ThemeProvider';

import MainPage from './MainPage';

export default {
  title: 'pages/MainPage',
  component: MainPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = (args: any) => <MainPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {
};
// Primary.decorators = [ThemeDecorator(Theme.LIGHT)];

// export const Dark = Template.bind({});
// Dark.args = {
// };
// Dark.decorators = [ThemeDecorator(Theme.DARK)];
