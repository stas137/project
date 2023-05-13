import { ComponentStory, ComponentMeta } from '@storybook/react';

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

export const Primary = Template.bind({});
Primary.args = {
  comment: {
    id: '1',
    text: 'hello world',
    user: { id: '1', username: 'User 1' },
    articleId: '1',
  },
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

// export const Dark = Template.bind({});
// Dark.args = {
// };
// Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
