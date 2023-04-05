import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Flex } from './Flex';

export default {
  title: 'shared/Flex',
  component: Flex,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Row = Template.bind({});
Row.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
    </>
  ),
};

export const RowGap8 = Template.bind({});
RowGap8.args = {
  gap: '8',
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
    </>
  ),
};

export const RowGap16 = Template.bind({});
RowGap16.args = {
  gap: '16',
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
    </>
  ),
};

export const RowGap32 = Template.bind({});
RowGap32.args = {
  gap: '32',
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
    </>
  ),
};

export const Column = Template.bind({});
Column.args = {
  direction: 'column',
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
    </>
  ),
};

export const ColumnGap8 = Template.bind({});
ColumnGap8.args = {
  direction: 'column',
  gap: '8',
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
    </>
  ),
};

export const ColumnGap16 = Template.bind({});
ColumnGap16.args = {
  direction: 'column',
  gap: '16',
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
    </>
  ),
};

export const ColumnAlignEnd = Template.bind({});
ColumnAlignEnd.args = {
  align: 'end',
  direction: 'column',
  gap: '16',
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
    </>
  ),
};
