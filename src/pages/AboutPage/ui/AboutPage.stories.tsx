import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { Theme } from 'shared/contexts/ThemeProvider';

import AboutPage from './AboutPage';

export default {
  title: 'pages/AboutPage',
  component: AboutPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = (args: any) => <AboutPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {
};
// Primary.decorators = [ThemeDecorator(Theme.LIGHT)];

// export const Dark = Template.bind({});
// Dark.args = {
// };
// Dark.decorators = [ThemeDecorator(Theme.DARK)];
