import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';

import { ArticleList } from './ArticleList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'entities/Article/ArticleList',
  component: ArticleList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => <ArticleList {...args} />;

const articles = [
  {
    id: '1',
    user: {
      id: '1',
      username: 'Ivan',
      avatar: 'https://cspromogame.ru//storage/upload_images/avatars/3419.jpg',
    },
    title: 'Javascript news news news news',
    subtitle: 'Hey hey 2023',
    img: 'https://codeguida.com/media/post_title/g3033.png',
    views: 1020,
    createdAt: '26.02.2023',
    type: [
      'IT',
      'SCIENCE',
      'POLITICS',
      'ECONOMICS',
    ],
    blocks: [
      {
        id: '1',
        type: 'TEXT',
        title: 'Block title',
        paragraphs: [
          'lorem1',
          'lorem2',
          'lorem3',
        ],
      },
      {
        id: '4',
        type: 'CODE',
        code: "<!DOCTYPE html>\n<html>\n  <body>\n    <p id='hello'></p>script>\ndocument.getElementById('hello').innerHTML = 'Hello, world!';\n              </script>\n            </body>\n          </html>",
      },
      {
        id: '5',
        type: 'TEXT',
        title: 'Block title',
        paragraphs: [
          'Современная сфера веб-разработки пестрит всевозможными технологиями и инструментами, среди которых новичок может легко растеряться. Статья посвящена общему обзору принципов фронтенд- и бэкенд-разработки, а также знакомит начинающих с наиболее актуальными инструментами и навыками, которые им потребуются для успешного продвижения по карьерному пути.',
          'lorem4',
          'lorem5',
        ],
      },
      {
        id: '2',
        type: 'IMAGE',
        src: 'https://habrastorage.org/r/w1560/webt/4u/wm/uq/4uwmuqhslkvvnsgt-kr_ggu7skg.png',
        title: 'Picture 1',
      },
      {
        id: '3',
        type: 'CODE',
        code: "<!DOCTYPE html>\n          <html>\n            <body>\n              <p id='hello'></p>              <script>\n                document.getElementById('hello').innerHTML = 'Hello, world!';\n              </script>\n            </body>\n          </html>",
      },
    ],
  },
  {
    id: '2',
    user: {
      id: '1',
      username: 'Ivan',
      avatar: 'https://cspromogame.ru//storage/upload_images/avatars/3419.jpg',
    },
    title: 'Javascript news news news news',
    subtitle: 'Hey hey 2023',
    img: 'https://codeguida.com/media/post_title/g3033.png',
    views: 1020,
    createdAt: '26.02.2023',
    type: [
      'IT',
      'SCIENCE',
      'POLITICS',
      'ECONOMICS',
    ],
    blocks: [
      {
        id: '1',
        type: 'TEXT',
        title: 'Block title',
        paragraphs: [
          'lorem1',
          'lorem2',
          'lorem3',
        ],
      },
      {
        id: '4',
        type: 'CODE',
        code: "<!DOCTYPE html>\n<html>\n  <body>\n    <p id='hello'></p>script>\ndocument.getElementById('hello').innerHTML = 'Hello, world!';\n              </script>\n            </body>\n          </html>",
      },
      {
        id: '5',
        type: 'TEXT',
        title: 'Block title',
        paragraphs: [
          'Современная сфера веб-разработки пестрит всевозможными технологиями и инструментами, среди которых новичок может легко растеряться. Статья посвящена общему обзору принципов фронтенд- и бэкенд-разработки, а также знакомит начинающих с наиболее актуальными инструментами и навыками, которые им потребуются для успешного продвижения по карьерному пути.',
          'lorem4',
          'lorem5',
        ],
      },
      {
        id: '2',
        type: 'IMAGE',
        src: 'https://habrastorage.org/r/w1560/webt/4u/wm/uq/4uwmuqhslkvvnsgt-kr_ggu7skg.png',
        title: 'Picture 1',
      },
      {
        id: '3',
        type: 'CODE',
        code: "<!DOCTYPE html>\n          <html>\n            <body>\n              <p id='hello'></p>              <script>\n                document.getElementById('hello').innerHTML = 'Hello, world!';\n              </script>\n            </body>\n          </html>",
      },
    ],
  },
] as Article[];

export const PrimaryList = Template.bind({});
PrimaryList.args = {
  isLoading: false,
  articles,
  view: ArticleView.LIST,
  virtualized: false,
};

PrimaryList.decorators = [StoreDecorator({})];

// export const PrimaryTile = Template.bind({});
// PrimaryTile.args = {
//   articles,
//   view: ArticleView.TILE,
// };

// export const LoadingList = Template.bind({});
// LoadingList.args = {
//   isLoading: true,
//   view: ArticleView.LIST,
// };

// export const LoadingTile = Template.bind({});
// LoadingTile.args = {
//   isLoading: true,
//   view: ArticleView.TILE,
// };

// export const Dark = Template.bind({});
// Dark.args = {
// };
// Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

// new Array(16)
// .fill(0)
// .map((_, index) => ({
//   ...article,
//   id: String(index),
// }))
