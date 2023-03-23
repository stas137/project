import { Article, ArticleList, ArticleView } from 'entities/Article';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const article = {
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
} as Article;

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;

  const { t } = useTranslation('article');

  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      <ArticleList
        view={ArticleView.LIST}
        articles={
          new Array(16)
            .fill(0)
            .map((_, index) => ({
              ...article,
              id: String(index),
            }))
        }
      />
    </div>
  );
};

export default memo(ArticlesPage);
