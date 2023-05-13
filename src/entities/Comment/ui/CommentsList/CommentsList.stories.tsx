import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentsList } from './CommentsList';

export default {
  title: 'entities/Comment/CommentsList',
  component: CommentsList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentsList>;

const Template: ComponentStory<typeof CommentsList> = (args) => (
  <CommentsList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  comments: [
    {
      id: '1',
      text: 'hello world',
      user: { id: '1', username: 'User 1' },
      articleId: '1',
    },
    {
      id: '2',
      text: 'hello world 2',
      user: { id: '1', username: 'User 2' },
      articleId: '1',
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  comments: [],
  isLoading: true,
};

// export const Dark = Template.bind({});
// Dark.args = {
// };
// Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
