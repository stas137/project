import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tabs } from './Tabs';

export default {
  title: 'shared/Tabs',
  component: Tabs,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  tabs: [
    {
      value: 'value1',
      content: 'content1',
    },
    {
      value: 'value2',
      content: 'content2',
    },
    {
      value: 'value3',
      content: 'content3',
    },
  ],
  value: 'value2',
  onTabClick: action('onTabClick'),
};

// export const PrimaryDark = Template.bind({});
// PrimaryDark.args = {
//   width: '100%',
//   height: 200,
// };
// PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
