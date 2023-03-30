import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { COUNT_ARTICLES_LIST_VIEW, COUNT_ARTICLES_TILE_VIEW } from 'shared/const/const';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => new Array(
  view === ArticleView.LIST
    ? COUNT_ARTICLES_LIST_VIEW
    : COUNT_ARTICLES_TILE_VIEW,
).fill(0).map((_, index) => (
  <ArticleListItemSkeleton className={cls.card} key={`${index}-skeleton`} view={view} />
));

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.TILE,
    target,
  } = props;

  const { t } = useTranslation('article');

  // if (isLoading) {
  //   return (
  //     <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
  //       {
  //         getSkeletons(view)
  //       }
  //     </div>
  //   );
  // }

  const renderArticle = (article: Article) => (
    <ArticleListItem
      key={article.id + article.title}
      className={cls.card}
      article={article}
      view={view}
      target={target}
    />
  );

  if (!isLoading && !articles?.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text title={t('articles-not-found')} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles?.length
        ? articles.map(renderArticle)
        : null}

      {isLoading
          && getSkeletons(view)}
    </div>
  );
});
