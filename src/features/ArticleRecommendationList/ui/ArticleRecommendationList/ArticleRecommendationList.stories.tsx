import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { Theme } from 'shared/contexts/ThemeProvider';

import { ArticleRecommendationList } from './ArticleRecommendationList';

export default {
  title: 'ArticleRecommendationList',
  component: ArticleRecommendationList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleRecommendationList>;

const Template: ComponentStory<typeof ArticleRecommendationList> = (args) => <ArticleRecommendationList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
// Primary.decorators = [ThemeDecorator(Theme.LIGHT)];
