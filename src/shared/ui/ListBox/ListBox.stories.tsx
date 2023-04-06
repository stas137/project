import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Currency } from 'entities/Currency';
import { ListBox } from './ListBox';

export default {
  title: 'shared/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

const items = [
  { value: Currency.USD, content: Currency.USD },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.RUB, content: Currency.RUB },
];

export const Primary = Template.bind({});
Primary.args = {
  value: items[0].value,
  items,
};

// PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
