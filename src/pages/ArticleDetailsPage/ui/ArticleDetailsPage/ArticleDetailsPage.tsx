import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Page } from '@/widgets/Page';

import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationList } from '@/features/ArticleRecommendationList';

import { ArticleDetails } from '@/entities/Article';

import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { StickyComponentLayout } from '@/shared/layouts/StickyComponentLayout';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  Reducers,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';

import { articleDetailsPageReducer } from '../../model/slices';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';

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
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('article-not-found')}
      </Page>
    );
  }

  // const isArticleRatingCard = toggleFeatures({
  //   name: 'isArticleRatingEnabled',
  //   on: () => <ArticleRating articleId={id} />,
  //   off: () => <Card>{t('Assessment will appear soon')}</Card>,
  // });

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <StickyComponentLayout
            content={
              <Page
                data-testid="ArticleDetailsPage"
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
              >
                <VStack gap="16">
                  <DetailsContainer />
                  <ArticleRating articleId={id} />
                  <ArticleRecommendationList />
                  <ArticleDetailsComments id={id} />
                </VStack>
              </Page>
            }
            right={<AdditionalInfoContainer />}
          />
        }
        off={
          <Page
            data-testid="ArticleDetailsPage"
            className={classNames(cls.ArticleDetailsPage, {}, [className])}
          >
            <VStack gap="16">
              <ArticleDetailsPageHeader />
              <ArticleDetails articleId={id} />

              <ToggleFeatures
                feature="isArticleRatingEnabled"
                on={<ArticleRating articleId={id} />}
                off={<Card>{t('Assessment will appear soon')}</Card>}
              />

              <ArticleRecommendationList />
              <ArticleDetailsComments id={id} />
            </VStack>
          </Page>
        }
      />
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
