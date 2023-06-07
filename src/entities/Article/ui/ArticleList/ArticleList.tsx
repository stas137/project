import {
  HTMLAttributeAnchorTarget,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Virtuoso,
  VirtuosoGrid,
  VirtuosoGridHandle,
  GridScrollSeekPlaceholderProps,
} from 'react-virtuoso';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/deprecated/Text';
import { LOCAL_STORAGE_ARTICLES_LIST_ITEM_IDX } from '@/shared/const/localstorage';

// eslint-disable-next-line project-path-checker-plugin/layer-imports
import {
  COUNT_ARTICLES_LIST_VIEW,
  COUNT_ARTICLES_TILE_VIEW,
} from '@/shared/const/const';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/consts';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures/ToggleFeatures';

import cls from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  virtualized?: boolean;
  onLoadNextPart?: () => void;
}

const getSkeletons = (view: ArticleView) =>
  new Array(
    view === ArticleView.LIST
      ? COUNT_ARTICLES_LIST_VIEW
      : COUNT_ARTICLES_TILE_VIEW,
  )
    .fill(0)
    .map((_, index) => (
      <ArticleListItemSkeleton
        className={cls.card}
        key={`${index}-skeleton`}
        view={view}
      />
    ));

// const Header = () => <ArticlesPageFilters />;
const Footer = (isLoading: boolean | undefined, view: ArticleView) => () => {
  if (isLoading) {
    return <div className={cls.skeleton}>{getSkeletons(view)}</div>;
  }

  return null;
};

const ItemContainerComp = (props: GridScrollSeekPlaceholderProps) => {
  const { index } = props;

  return (
    <ArticleListItemSkeleton
      className={cls.card}
      key={index}
      view={ArticleView.TILE}
    />
  );
};

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.TILE,
    target,
    virtualized = true,
    onLoadNextPart,
  } = props;

  const { t } = useTranslation('article');

  const [selectedArticleId, setSelectedArticleId] = useState(1);
  const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);

  const isList = view === ArticleView.LIST;
  const itemsPerRow = isList ? 1 : 3;
  const rowCount = isList
    ? articles.length
    : Math.ceil(articles.length / itemsPerRow);

  useEffect(() => {
    const currentArticleId =
      localStorage.getItem(LOCAL_STORAGE_ARTICLES_LIST_ITEM_IDX) || 0;

    setSelectedArticleId(+currentArticleId);

    // return () => localStorage.removeItem(LOCAL_STORAGE_ARTICLES_LIST_ITEM_IDX);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (view === ArticleView.TILE) {
      timeoutId = setTimeout(() => {
        if (virtuosoGridRef.current) {
          virtuosoGridRef.current.scrollToIndex(selectedArticleId);
        }
      }, 100);
    }

    return () => clearTimeout(timeoutId);
  }, [selectedArticleId, view]);

  // if (isLoading) {
  //   return (
  //     <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
  //       {
  //         getSkeletonsLoading(view)
  //       }
  //     </div>
  //   );
  // }

  const renderArticle = (index: number, article: Article) => {
    return (
      <ArticleListItem
        key={article.id}
        className={cls.card}
        article={article}
        view={view}
        target={target}
        index={index}
      />
    );
  };

  if (!isLoading && !articles?.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text title={t('articles-not-found')} />
      </div>
    );
  }

  if (!virtualized) {
    return (
      <HStack gap="16">
        {articles.map((article) => (
          <ArticleListItem
            key={article.id}
            className={cls.card}
            article={article}
            view={view}
            target={target}
          />
        ))}
      </HStack>
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <HStack
          className={classNames(cls.ArticleListRedesigned, {}, [
            className,
            cls[view],
          ])}
          wrap="wrap"
          gap="16"
          data-testid="ArticleList"
        >
          {articles.map((article) => (
            <ArticleListItem
              key={article.id}
              className={cls.card}
              article={article}
              view={view}
              target={target}
            />
          ))}
          {isLoading && getSkeletons(view)}
          {getSkeletons(view)}
        </HStack>
      }
      off={
        <div
          className={classNames(cls.ArticleList, {}, [className, cls[view]])}
        >
          {view === ArticleView.LIST ? (
            <Virtuoso
              style={{ height: '100%' }}
              data={articles}
              totalCount={rowCount}
              itemContent={renderArticle}
              endReached={onLoadNextPart}
              initialTopMostItemIndex={selectedArticleId}
              components={{
                // Header,
                Footer: Footer(isLoading, view),
              }}
            />
          ) : (
            <VirtuosoGrid
              style={{ width: '100%' }}
              ref={virtuosoGridRef}
              totalCount={articles.length}
              components={{
                // Header,
                Footer: Footer(isLoading, view),
                ScrollSeekPlaceholder: ItemContainerComp,
              }}
              endReached={onLoadNextPart}
              data={articles}
              itemContent={renderArticle}
              listClassName={cls.itemWrapper}
              scrollSeekConfiguration={{
                enter: (velocity) => Math.abs(velocity) > 350,
                exit: (velocity) => Math.abs(velocity) < 50,
              }}
            />
          )}
        </div>
      }
    />
  );
});
