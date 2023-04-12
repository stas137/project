import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { ArticleList } from 'entities/Article';
import { VStack } from 'shared/ui/Stack';
import { useGetArticleRecommendationList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationListProps {
  className?: string;
}

export const ArticleRecommendationList = memo((props: ArticleRecommendationListProps) => {
  const {
    className,
  } = props;

  const { t } = useTranslation();

  const {
    data: recommendations,
    isLoading: recommendationsIsLoading,
    error: recommendationsError,
  } = useGetArticleRecommendationList(3);

  if (recommendationsIsLoading || recommendationsError) {
    return null;
  }

  return (
    <VStack
      className={classNames('', {}, [className])}
      gap="8"
    >
      <Text
        // className={cls.recommendationTitle}
        title={t('recommendations')}
      />
      <ArticleList
        // className={cls.recommendations}
        articles={recommendations}
        isLoading={recommendationsIsLoading}
        target="_blank"
      />
    </VStack>
  );
});
