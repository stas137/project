import { useTranslation } from 'react-i18next';
import { BugButton } from '@/app/providers/ErrorBoundary';
import { Page } from '@/widgets/Page/Page';
import { RatingCard } from '@/entities/Rating';

const MainPage = () => {
  const { t } = useTranslation('main');

  return (
    <Page>
      <BugButton />
      {t('main-page')}

      <RatingCard
        title="Assesment"
        feedbackTitle="Review"
        hasFeedback
      />
    </Page>
  );
};

export default MainPage;
