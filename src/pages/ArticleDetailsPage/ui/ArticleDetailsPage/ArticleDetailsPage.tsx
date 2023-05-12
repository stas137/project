import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  Reducers,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { ArticleRecommendationList } from '@/features/ArticleRecommendationList';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleRating } from '@/features/ArticleRating';

import cls from './ArticleDetailsPage.module.scss';

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

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('article-not-found')}
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <Page
        data-testid="ArticleDetailsPage"
        className={classNames(cls.ArticleDetailsPage, {}, [className])}
      >
        <VStack gap="16">
          <ArticleDetailsPageHeader />
          <ArticleDetails articleId={id} />
          <ArticleRating articleId={id} />
          <ArticleRecommendationList />
          <ArticleDetailsComments id={id} />
        </VStack>
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
