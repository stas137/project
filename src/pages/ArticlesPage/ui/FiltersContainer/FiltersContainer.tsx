import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
  const { className } = props;

  const { t } = useTranslation();

  const {
    order,
    sort,
    search,
    typeArticle,
    onChangeOrder,
    onChangeSort,
    onChangeSearch,
    onChangeType,
  } = useArticleFilters();

  return (
    <ArticlesFilters
      className={className}
      sort={sort}
      order={order}
      search={search}
      typeArticle={typeArticle}
      onChangeOrder={onChangeOrder}
      onChangeSort={onChangeSort}
      onChangeSearch={onChangeSearch}
      onChangeType={onChangeType}
    />
  );
});
