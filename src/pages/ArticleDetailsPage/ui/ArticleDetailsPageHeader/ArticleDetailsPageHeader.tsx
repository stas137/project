import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ArticleEditButton } from '@/features/ArticleEditButton';

import { Button } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';

import { classNames } from '@/shared/lib/classNames/classNames';

import { getRouteArticles } from '@/shared/const/router';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;

    const { t } = useTranslation('article');
    const navigate = useNavigate();

    // const canEdit = useSelector(getArticleCanEditUser);

    const onBackToList = useCallback(() => {
      navigate(getRouteArticles());
    }, [navigate]);

    return (
      <HStack
        className={classNames('', {}, [className])}
        justify="between"
      >
        <Button onClick={onBackToList}>{t('back')}</Button>
        <ArticleEditButton />
      </HStack>
    );
  },
);
