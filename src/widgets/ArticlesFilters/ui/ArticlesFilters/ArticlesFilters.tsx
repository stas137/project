import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';

import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';

import { ArticleSortSelector } from '@/features/ArticleSortSelector';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Input } from '@/shared/ui/redesigned/Input';

import cls from './ArticlesFilters.module.scss';

interface ArticlesFiltersProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  typeArticle: ArticleType;
  search: string;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeType: (type: ArticleType) => void;
  onChangeSearch: (value: string) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
  const {
    className,
    sort,
    order,
    typeArticle,
    search,
    onChangeSort,
    onChangeOrder,
    onChangeType,
    onChangeSearch,
  } = props;

  const { t } = useTranslation();

  return (
    <Card
      className={classNames(cls.ArticlesFilters, {}, [className])}
      padding="24"
    >
      <VStack gap="16">
        <Input
          placeholder={t('search')}
          value={search}
          onChange={onChangeSearch}
        />

        <ArticleTypeTabs
          // className={cls.tabs}
          value={typeArticle}
          onChangeType={onChangeType}
        />

        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </VStack>
    </Card>
  );
});
