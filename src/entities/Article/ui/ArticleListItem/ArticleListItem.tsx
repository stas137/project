import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/consts';

import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures/ToggleFeatures';
import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';

export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  index?: number;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view, target, index } = props;

  const { t } = useTranslation('article');

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<ArticleListItemRedesigned {...props} />}
      off={<ArticleListItemDeprecated {...props} />}
    />
  );
});
