import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select';
import { ArticleSortField } from '@/entities/Article';

import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures/ToggleFeatures';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, sort, order, onChangeSort, onChangeOrder } = props;

  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: 'asc',
        content: t('asc'),
      },
      {
        value: 'desc',
        content: t('desc'),
      },
    ],
    [t],
  );

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
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
    ],
    [t],
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <VStack
          className={classNames(cls.ArticleSortSelector, {}, [className])}
          gap="8"
        >
          <Text text={t('sort')} />
          <ListBox<ArticleSortField>
            items={sortFieldOptions}
            value={sort}
            onChange={onChangeSort}
          />
          <ListBox<SortOrder>
            items={orderOptions}
            value={order}
            onChange={onChangeOrder}
          />
        </VStack>
      }
      off={
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
      }
    />
  );
});
