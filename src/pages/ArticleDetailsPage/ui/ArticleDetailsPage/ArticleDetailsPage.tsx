import { ArticleDetails, ArticleList } from 'entities/Article';
import { CommentsList } from 'entities/Comment';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  Reducers,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from 'shared/ui/Text/Text';
import { AddCommentForm } from 'features/AddCommentForm';
import { Button } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'widgets/Page/Page';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slices';
import {
  fetchArticleRecommendations,
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import {
  addCommentForArticle,
} from '../../model/services/addCommentForArticle/addCommentForArticle';
import {
  fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
  getArticleCommentsError,
  getArticleCommentsIsLoading,
} from '../../model/selectors/articleDetailsCommentsSelectors';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { getArticleRecommendations } from '../../model/slices/articleDetailsRecommendationsSlice';
import cls from './ArticleDetailsPage.module.scss';
import {
  getArticleRecommendationsError,
  getArticleRecommendationsIsLoading,
} from '../../model/selectors/articleDetailsRecommendationsSelectors';

interface ArticleDetailsPageProps {
  className?: string;
}

const initialReducers: Reducers = {
  // articleDetailsComments: articleDetailsCommentsReducer,
  // articleDetailsRecommendations: articleDetailsRecommendationsReducer,
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { t } = useTranslation('article');
  const { id } = useParams<{id: string}>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const commentsError = useSelector(getArticleCommentsError);

  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
  const recommendationsError = useSelector(getArticleRecommendationsError);

  const onSendComment = useCallback((value: string) => {
    dispatch(addCommentForArticle(value));
  }, [dispatch]);

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  // useInitialEffect(() => {
  //   dispatch(fetchCommentsByArticleId(id));
  //   dispatch(fetchArticleRecommendations());
  // });

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticleRecommendations());
  }, [dispatch, id]);

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('article-not-found')}
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <Button onClick={onBackToList}>{t('back')}</Button>
        <ArticleDetails articleId={id} />

        <Text className={cls.recommendationTitle} title={t('recommendations')} />
        <ArticleList
          className={cls.recommendations}
          articles={recommendations}
          isLoading={recommendationsIsLoading}
          target="_blank"
        />

        <Text className={cls.commentTitle} title={t('comments')} />
        <AddCommentForm onSendComment={onSendComment} />

        <CommentsList
          isLoading={commentsIsLoading}
          comments={comments}
        />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);

// comments = [
//   {
//     id: '1',
//     text: ' comment 1',
//     user: {
//       id: '1',
//       username: 'Ivan',
//       avatar: 'https://cspromogame.ru//storage/upload_images/avatars/3419.jpg',
//     },
//   },
//   {
//     id: '2',
//     text: ' comment 2',
//     user: {
//       id: '2',
//       username: 'iIan',
//       avatar: 'https://cspromogame.ru//storage/upload_images/avatars/911.jpg',
//     },
//   },
// ]
