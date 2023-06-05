import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  DynamicModuleLoader,
  Reducers,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { ArticleList } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { fetchNextArticlesList } from '../../model/services/fetchNextArticlesList/fetchNextArticlesList';
import {
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import {
  articlesPageReducer,
  getArticlesPage,
} from '../../model/slice/articlesPageSlice';

import cls from './ArticlesPage.module.scss';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures/ToggleFeatures';
import { StickyComponentLayout } from '@/shared/layouts/StickyComponentLayout';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

interface ArticlesPageProps {
  className?: string;
}

const initialReducers: Reducers = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const articles = useSelector(getArticlesPage.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesList());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  const content = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <StickyComponentLayout
          left={<ViewSelectorContainer />}
          content={
            <ArticleList
              className={classNames(cls.listRedesigned, {}, [className])}
              isLoading={isLoading}
              view={view}
              articles={articles}
              onLoadNextPart={onLoadNextPart}
            />
          }
          right={<FiltersContainer />}
        />
      }
      off={
        <ArticleList
          className={classNames(cls.list, {}, [className])}
          isLoading={isLoading}
          view={view}
          articles={articles}
          onLoadNextPart={onLoadNextPart}
        />
      }
    />
  );

  return (
    <DynamicModuleLoader
      reducers={initialReducers}
      removeAfterUnmount={false}
    >
      {content}
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
