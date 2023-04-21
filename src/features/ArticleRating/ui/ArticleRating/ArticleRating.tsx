import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { useGetArticleRating, useSetArticleRating } from '../../api/articleRatingApi';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

// import cls from './ArticleRating.module.scss';

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
  const {
    className,
    articleId,
  } = props;

  const { t } = useTranslation();

  const authData = useSelector(getUserAuthData);

  const {
    data,
    isLoading,
  } = useGetArticleRating({
    articleId,
    userId: authData?.id ?? '',
  });

  const [setArticleRatingMutation, { isLoading: isLoadingSet }] = useSetArticleRating();

  const handleArticleRatingMutation = useCallback((starsCount: number, feedback?: string) => {
    try {
      setArticleRatingMutation({
        articleId,
        userId: authData?.id ?? '',
        rate: starsCount,
        feedback,
      });
    } catch (e) {
      // handle error
      console.log(e);
    }
  }, [setArticleRatingMutation, articleId, authData?.id]);

  const onAccept = useCallback((starsCount: number, feedback?: string) => {
    handleArticleRatingMutation(starsCount, feedback);
  }, [handleArticleRatingMutation]);

  const onCancel = useCallback((starsCount: number) => {
    handleArticleRatingMutation(starsCount);
  }, [handleArticleRatingMutation]);

  if (isLoading) {
    return (
      <Skeleton width="100%" height="120px" />
    );
  }

  const rating = data?.[0];

  return (
    <RatingCard
      className={classNames('', {}, [className])}
      title={t('assesment')}
      feedbackTitle={t('review')}
      hasFeedback
      rate={rating?.rate}
      onAccept={onAccept}
      onCancel={onCancel}
    />
  );
});

export default ArticleRating;
