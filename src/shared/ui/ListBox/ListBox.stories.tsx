import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Currency } from 'entities/Currency';
import { ListBox } from './ListBox';

export default {
  title: 'shared/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => <div style={{ padding: '150px' }}><Story /></div>,
  ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

const items = [
  { value: Currency.USD, content: Currency.USD },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.RUB, content: Currency.RUB },
];

export const PrimaryTopLeft = Template.bind({});
PrimaryTopLeft.args = {
  value: items[0].value,
  items,
  direction: 'top left',
};

export const PrimaryTopRight = Template.bind({});
PrimaryTopRight.args = {
  value: items[0].value,
  items,
  direction: 'top right',
};

export const PrimaryBottomLeft = Template.bind({});
PrimaryBottomLeft.args = {
  value: items[0].value,
  items,
  direction: 'bottom left',
};

export const PrimaryBottomRight = Template.bind({});
PrimaryBottomRight.args = {
  value: items[0].value,
  items,
  direction: 'bottom right',
};

// PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
