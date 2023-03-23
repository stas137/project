import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

const COUNT_SKELETON_ARTICLES_LIST_VIEW = 3;
const COUNT_SKELETON_ARTICLES_TILE_VIEW = 9;

const getSkeletons = (view: ArticleView) => new Array(
  view === ArticleView.LIST
    ? COUNT_SKELETON_ARTICLES_LIST_VIEW
    : COUNT_SKELETON_ARTICLES_TILE_VIEW,
).fill(0).map((_, index) => (
  <ArticleListItemSkeleton className={cls.card} key={`${index}-skeleton`} view={view} />
));

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.TILE,
  } = props;

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        {
          getSkeletons(view)
        }
      </div>
    );
  }

  const renderArticle = (article: Article) => (
    <ArticleListItem
      key={article.id + article.title}
      className={cls.card}
      article={article}
      view={view}
    />
  );

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length
        ? articles.map(renderArticle)
        : null}
    </div>
  );
});