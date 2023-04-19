import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text/Text';
import { Page } from '@/widgets/Page/Page';
import { ArticleList } from '@/entities/Article';
import { getArticlesPage } from '../../model/slice/articlesPageSlice';
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
  const {
    className,
  } = props;

  const { t } = useTranslation();

  const articles = useSelector(getArticlesPage.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);

  if (error) {
    return (
      <Page className={classNames('', {}, [className])}>
        <Text text={t('error-loading-articles')} />
      </Page>
    );
  }

  return (
    <ArticleList
      // className={cls.list}
      className={className}
      isLoading={isLoading}
      view={view}
      articles={articles}
    />
  );
});
