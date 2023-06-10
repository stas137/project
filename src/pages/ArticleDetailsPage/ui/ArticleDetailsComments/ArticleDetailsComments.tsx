import { Suspense, memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { AddCommentForm } from '@/features/AddCommentForm';

import { getArticleDetailsIsLoading } from '@/entities/Article';
import { CommentsList } from '@/entities/Comment';

import { Loader } from '@/shared/ui/deprecated/Loader';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  getArticleCommentsError,
  getArticleCommentsIsLoading,
} from '../../model/selectors/articleDetailsCommentsSelectors';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';

interface ArticleDetailsCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDetailsComments = memo(
  (props: ArticleDetailsCommentsProps) => {
    const { className, id } = props;

    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const isLoadingArticle = useSelector(getArticleDetailsIsLoading);
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const commentsError = useSelector(getArticleCommentsError);

    const onSendComment = useCallback(
      (value: string) => {
        dispatch(addCommentForArticle(value));
      },
      [dispatch],
    );

    // useInitialEffect(() => {
    //   dispatch(fetchCommentsByArticleId(id));
    //   dispatch(fetchArticleRecommendations());
    // });

    useEffect(() => {
      dispatch(fetchCommentsByArticleId(id));
      // dispatch(fetchArticleRecommendations());
    }, [dispatch, id]);

    if (isLoadingArticle) {
      return (
        <Skeleton
          width="100%"
          height={200}
        />
      );
    }

    return (
      <VStack
        className={classNames('', {}, [className])}
        gap="16"
      >
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text title={t('comments')} />}
          off={<TextDeprecated title={t('comments')} />}
        />

        <Suspense fallback={<Loader />}>
          <AddCommentForm onSendComment={onSendComment} />
        </Suspense>

        <CommentsList
          isLoading={commentsIsLoading}
          comments={comments}
        />
      </VStack>
    );
  },
);
