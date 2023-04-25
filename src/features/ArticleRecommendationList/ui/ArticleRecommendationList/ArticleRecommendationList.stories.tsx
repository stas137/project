import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { Theme } from 'shared/contexts/ThemeProvider';
import withMock from 'storybook-addon-mock';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Article } from '@/entities/Article';
import { ArticleRecommendationList } from './ArticleRecommendationList';

const article: Article = {
  id: '1',
  img: '',
  createdAt: '',
  views: 12,
  user: {
    id: '1',
    username: 'user',
  },
  blocks: [],
  type: [],
  title: 'title',
  subtitle: 'subtitle',
};

export default {
  title: 'features/ArticleRecommendationList',
  component: ArticleRecommendationList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock],
} as ComponentMeta<typeof ArticleRecommendationList>;

const Template: ComponentStory<typeof ArticleRecommendationList> = (args) => <ArticleRecommendationList {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({})];
Primary.parameters = {
  mockData: [
    {
      url: `${__API__}/articles?_limit=3`,
      method: 'GET',
      status: 200,
      response: [
        { ...article, id: '1' },
        { ...article, id: '2' },
        { ...article, id: '3' },
      ],
    },
  ],
};
