import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  getArticleCanEditUser,
  getArticleDetailsData,
} from '@/entities/Article';

import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Button as ButtonRedesigned } from '@/shared/ui/redesigned/Button';

import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';

import { getRouteArticleEdit } from '@/shared/const/router';

interface ArticleEditButtonProps {
  className?: string;
}

export const ArticleEditButton = memo((props: ArticleEditButtonProps) => {
  const { className } = props;

  const { t } = useTranslation();

  const navigate = useNavigate();

  const article = useSelector(getArticleDetailsData);
  const canEdit = useSelector(getArticleCanEditUser);

  const onEditArticle = useCallback(() => {
    navigate(getRouteArticleEdit(article?.id as string));
  }, [navigate, article?.id]);

  if (!canEdit) {
    return null;
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <ButtonRedesigned onClick={onEditArticle}>{t('edit')}</ButtonRedesigned>
      }
      off={
        <ButtonDeprecated onClick={onEditArticle}>{t('edit')}</ButtonDeprecated>
      }
    />
  );
});
