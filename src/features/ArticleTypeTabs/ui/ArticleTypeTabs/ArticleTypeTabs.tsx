import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';

import { ArticleType } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';
import { TabItem, Tabs } from '@/shared/ui/redesigned/Tabs';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = (props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props;

  const { t } = useTranslation();

  const typeTabs = useMemo<TabItem<ArticleType>[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: t('ALL'),
      },
      {
        value: ArticleType.IT,
        content: t('IT'),
      },
      {
        value: ArticleType.ECONOMICS,
        content: t('ECONOMICS'),
      },
      {
        value: ArticleType.SCIENCE,
        content: t('SCIENCE'),
      },
    ],
    [t],
  );

  const onTabClick = useCallback(
    (tabItem: TabItem<ArticleType>) => {
      onChangeType(tabItem.value);
    },
    [onChangeType],
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Tabs<ArticleType>
          className={classNames('', {}, [className])}
          tabs={typeTabs}
          value={value}
          direction="column"
          onTabClick={onTabClick}
        />
      }
      off={
        <TabsDeprecated<ArticleType>
          className={classNames('', {}, [className])}
          tabs={typeTabs}
          value={value}
          onTabClick={onTabClick}
        />
      }
    />
  );
};
