import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleList } from '@/entities/Article';

import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';

import { useArticleRecommendationList } from '../../api/articleRecommendationApi';

interface ArticleRecommendationListProps {
  className?: string;
}

export const ArticleRecommendationList = memo(
  (props: ArticleRecommendationListProps) => {
    const { className } = props;

    const { t } = useTranslation();

    const {
      data: recommendations,
      isLoading: recommendationsIsLoading,
      error: recommendationsError,
    } = useArticleRecommendationList(3);

    if (recommendationsIsLoading || recommendationsError || !recommendations) {
      return null;
    }

    return (
      <VStack
        data-testid="ArticleRecommendationList"
        className={classNames('', {}, [className])}
        gap="8"
      >
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text title={t('recommendations')} />}
          off={
            <TextDeprecated
              // className={cls.recommendationTitle}
              title={t('recommendations')}
            />
          }
        />

        <ArticleList
          // className={cls.recommendations}
          articles={recommendations}
          isLoading={recommendationsIsLoading}
          target="_blank"
          virtualized={false}
        />
      </VStack>
    );
  },
);
