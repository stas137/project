import {
  Suspense, memo, useCallback, useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { CommentsList } from '@/entities/Comment';
import { Text } from '@/shared/ui/Text';
import { AddCommentForm } from '@/features/AddCommentForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { VStack } from '@/shared/ui/Stack';
import { Loader } from '@/shared/ui/Loader';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import {
  getArticleCommentsError,
  getArticleCommentsIsLoading,
} from '../../model/selectors/articleDetailsCommentsSelectors';
import {
  addCommentForArticle,
} from '../../model/services/addCommentForArticle/addCommentForArticle';
import {
  fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { Skeleton } from '@/shared/ui/Skeleton';
import { getArticleDetailsIsLoading } from '@/entities/Article';

interface ArticleDetailsCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
  const {
    className,
    id,
  } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const isLoadingArticle = useSelector(getArticleDetailsIsLoading);
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const commentsError = useSelector(getArticleCommentsError);

  const onSendComment = useCallback((value: string) => {
    dispatch(addCommentForArticle(value));
  }, [dispatch]);

  // useInitialEffect(() => {
  //   dispatch(fetchCommentsByArticleId(id));
  //   dispatch(fetchArticleRecommendations());
  // });

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    // dispatch(fetchArticleRecommendations());
  }, [dispatch, id]);

  if (isLoadingArticle) {
    return <Skeleton width="100%" height={200} />;
  }

  return (
    <VStack
      className={classNames('', {}, [className])}
      gap="16"
    >
      <Text
        // className={cls.commentTitle}
        title={t('comments')}
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
});
