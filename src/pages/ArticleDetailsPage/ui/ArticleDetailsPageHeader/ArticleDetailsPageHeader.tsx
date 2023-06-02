import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getArticleDetailsData } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { getArticleCanEditUser } from '../../model/selectors/articleDetailsSelectors';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;

    const { t } = useTranslation('article');
    const navigate = useNavigate();

    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getArticleCanEditUser);

    const onBackToList = useCallback(() => {
      navigate(getRouteArticles());
    }, [navigate]);

    const onEditArticle = useCallback(() => {
      navigate(getRouteArticleEdit(article?.id as string));
    }, [navigate, article?.id]);

    return (
      <HStack
        className={classNames('', {}, [className])}
        justify="between"
      >
        <Button onClick={onBackToList}>{t('back')}</Button>
        {canEdit && <Button onClick={onEditArticle}>{t('edit')}</Button>}
      </HStack>
    );
  },
);
