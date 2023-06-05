import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';

import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';

import cls from './ArticlesPageFilters.module.scss';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ArticlesPageFilterProps {
  className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFilterProps) => {
  const { className } = props;

  const { t } = useTranslation();

  const {
    view,
    order,
    sort,
    search,
    typeArticle,
    onChangeView,
    onChangeOrder,
    onChangeSort,
    onChangeSearch,
    onChangeType,
  } = useArticleFilters();

  return (
    <div className={classNames(cls.ArticlesPageFilter, {}, [className])}>
      <div className={cls.filterWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector
          view={view}
          onChangeView={onChangeView}
        />
      </div>

      <Card className={cls.search}>
        <Input
          placeholder={t('search')}
          value={search}
          onChange={onChangeSearch}
        />
      </Card>

      <ArticleTypeTabs
        className={cls.tabs}
        value={typeArticle}
        onChangeType={onChangeType}
      />
    </div>
  );
});
