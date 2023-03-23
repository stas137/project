import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from '../Text/Text';

import { Card } from './Card';

export default {
  title: 'shared/Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: <Text title="Title" text="text text" />,
};
// Primary.decorators = [ThemeDecorator(Theme.LIGHT)];

// export const Dark = Template.bind({});
// Dark.args = {
//   placeholder: 'Type text',
//   value: 'Text',
// };
// Dark.decorators = [ThemeDecorator(Theme.DARK)];
