import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Dropdown } from './Dropdown';
import { Button } from '../../../Button/Button';

export default {
  title: 'shared/Popups/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

const items = [
  { content: 'First', disabled: true },
  { content: 'Second' },
  { content: 'Third' },
];

export const Primary = Template.bind({});
Primary.args = {
  trigger: <Button>Open</Button>,
  items,
  direction: 'bottom right',
};

// PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
