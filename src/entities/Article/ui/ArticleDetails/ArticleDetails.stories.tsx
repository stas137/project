import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Article } from '../../model/types/article';
import { ArticleBlockType, ArticleType } from '../../model/consts/consts';

import { ArticleDetails } from './ArticleDetails';

export default {
  title: 'entities/Article/ArticleDetails',
  component: ArticleDetails,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleDetails>;

const Template: ComponentStory<typeof ArticleDetails> = (args) => (
  <ArticleDetails {...args} />
);

const article: Article = {
  id: '1',
  user: {
    id: '1',
    username: 'Ivan',
  },
  title: 'Javascript news',
  subtitle: 'Hey hey 2023',
  img: 'https://codeguida.com/media/post_title/g3033.png',
  views: 1020,
  createdAt: '26.02.2023',
  type: [ArticleType.IT],
  blocks: [
    {
      id: '1',
      type: ArticleBlockType.TEXT,
      title: 'Block title',
      paragraphs: ['lorem1', 'lorem2', 'lorem3'],
    },
    {
      id: '4',
      type: ArticleBlockType.CODE,
      code: "<!DOCTYPE html>\n<html>\n  <body>\n    <p id='hello'></p>script>\ndocument.getElementById('hello').innerHTML = 'Hello, world!';\n              </script>\n            </body>\n          </html>",
    },
    {
      id: '5',
      type: ArticleBlockType.TEXT,
      title: 'Block title',
      paragraphs: [
        'Современная сфера веб-разработки пестрит всевозможными технологиями и инструментами, среди которых новичок может легко растеряться. Статья посвящена общему обзору принципов фронтенд- и бэкенд-разработки, а также знакомит начинающих с наиболее актуальными инструментами и навыками, которые им потребуются для успешного продвижения по карьерному пути.',
        'lorem4',
        'lorem5',
      ],
    },
    {
      id: '2',
      type: ArticleBlockType.IMAGE,
      src: 'https://habrastorage.org/r/w1560/webt/4u/wm/uq/4uwmuqhslkvvnsgt-kr_ggu7skg.png',
      title: 'Picture 1',
    },
    {
      id: '3',
      type: ArticleBlockType.CODE,
      code: "<!DOCTYPE html>\n          <html>\n            <body>\n              <p id='hello'></p>              <script>\n                document.getElementById('hello').innerHTML = 'Hello, world!';\n              </script>\n            </body>\n          </html>",
    },
  ],
};

export const Primary = Template.bind({});
Primary.args = {};

Primary.decorators = [
  StoreDecorator({
    articleDetails: {
      isLoading: false,
      data: article,
    },
  }),
];

export const Loading = Template.bind({});
Loading.args = {};

Loading.decorators = [
  StoreDecorator({
    articleDetails: {
      isLoading: true,
    },
  }),
];

export const Error = Template.bind({});
Error.args = {};

Error.decorators = [
  StoreDecorator({
    articleDetails: {
      error: 'Error',
    },
  }),
];

// export const PrimaryDark = Template.bind({});
// PrimaryDark.args = {
//   width: '100%',
//   height: 200,
// };
