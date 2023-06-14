import { ComponentMeta, ComponentStory } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';

import { CommentCard } from './CommentCard';

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
  <CommentCard {...args} />
);

const primaryArgs = {
  comment: {
    id: '1',
    text: 'hello world',
    user: { id: '1', username: 'User 1' },
    articleId: '1',
  },
};

export const Primary = Template.bind({});
Primary.args = { ...primaryArgs };
// Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: false })];

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = {
  ...primaryArgs,
};
PrimaryRedesigned.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
];

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

// export const Dark = Template.bind({});
// Dark.args = {
// };
// Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
