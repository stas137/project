import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { COUNT_ARTICLES_LIST_VIEW, COUNT_ARTICLES_TILE_VIEW } from 'shared/const/const';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { List, ListRowProps, WindowScroller } from 'react-virtualized';
import { PAGE_ID } from 'widgets/Page/Page';
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
  virtualized?: boolean;
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
    virtualized = true,
  } = props;

  const { t } = useTranslation('article');

  const isList = view === ArticleView.LIST;
  const itemsPerRow = isList ? 1 : 3;
  const rowCount = isList ? articles.length : Math.ceil(articles.length / itemsPerRow);

  // if (isLoading) {
  //   return (
  //     <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
  //       {
  //         getSkeletons(view)
  //       }
  //     </div>
  //   );
  // }

  const rowRenderer = ({
    index, key, style,
  }: ListRowProps) => {
    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

    for (let i = fromIndex; i < toIndex; i += 1) {
      items.push(
        <ArticleListItem
          key={articles[i].id}
          className={cls.card}
          article={articles[i]}
          view={view}
          target={target}
        />,
      );
    }

    return (
      <div
        key={key}
        className={cls.row}
        style={style}
      >
        {items}
      </div>
    );
  };

  if (!isLoading && !articles?.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text title={t('articles-not-found')} />
      </div>
    );
  }

  return (

    <WindowScroller
      scrollElement={document.getElementById(PAGE_ID) as Element}
    >
      {({
        height, width, registerChild, scrollTop, isScrolling, onChildScroll,
      }) => (
        <div
          className={classNames(cls.ArticleList, {}, [className, cls[view]])}
          ref={registerChild}
        >
          {
            virtualized ? (
              <List
                autoHeight
                height={height ?? 609}
                rowCount={rowCount}
                rowHeight={isList ? 609 : 314}
                rowRenderer={rowRenderer}
                width={width ? width - 80 : 700}
                scrollTop={scrollTop}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
              />
            ) : (
              articles.map((article) => (
                <ArticleListItem
                  key={article.id}
                  className={cls.card}
                  article={article}
                  view={view}
                  target={target}
                />
              ))
            )
          }

          {isLoading && getSkeletons(view)}
        </div>
      )}

    </WindowScroller>

  );
});
