import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { SortOrder } from 'shared/types';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { ArticleSortField } from '../../model/consts/consts';

import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const {
    className,
    sort,
    order,
    onChangeSort,
    onChangeOrder,
  } = props;

  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
    {
      value: 'asc',
      content: t('asc'),
    },
    {
      value: 'desc',
      content: t('desc'),
    },
  ], [t]);

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
    {
      value: ArticleSortField.CREATED,
      content: t('created'),
    },
    {
      value: ArticleSortField.TITLE,
      content: t('title'),
    },
    {
      value: ArticleSortField.VIEWS,
      content: t('views'),
    },
  ], [t]);

  // const changeSortHandle = useCallback((newSort: string) => {
  //   onChangeSort(newSort as ArticleSortField);
  // }, [onChangeSort]);

  // const changeOrderHandle = useCallback((newOrder: string) => {
  //   onChangeOrder(newOrder as SortOrder);
  // }, [onChangeOrder]);

  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <Select<ArticleSortField>
        label={t('sort')}
        options={sortFieldOptions}
        value={sort}
        onChange={onChangeSort}
      />
      <Select<SortOrder>
        className={cls.order}
        label={t('order')}
        options={orderOptions}
        value={order}
        onChange={onChangeOrder}
      />
    </div>
  );
});
