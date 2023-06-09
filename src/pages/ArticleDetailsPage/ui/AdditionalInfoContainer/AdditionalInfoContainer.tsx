import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';

import { getArticleDetailsData } from '@/entities/Article';

import { Card } from '@/shared/ui/redesigned/Card';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AdditionalInfoContainer.module.scss';

interface AdditionalInfoContainerProps {
  className?: string;
}

export const AdditionalInfoContainer = memo(
  (props: AdditionalInfoContainerProps) => {
    const { className } = props;

    const { t } = useTranslation();

    const article = useSelector(getArticleDetailsData);

    if (!article) {
      return null;
    }

    return (
      <Card
        className={cls.card}
        padding="24"
        border="rounded"
      >
        <ArticleAdditionalInfo
          className={classNames('', {}, [className])}
          author={article.user}
          createdAt={article.createdAt}
          views={article.views}
        />
      </Card>
    );
  },
);
