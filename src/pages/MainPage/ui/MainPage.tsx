import { useTranslation } from 'react-i18next';
import { BugButton } from '@/app/providers/ErrorBoundary';
import { Page } from '@/widgets/Page';

const MainPage = () => {
  const { t } = useTranslation('main');

  return (
    <Page>
      <BugButton />
      {t('main-page')}

    </Page>
  );
};

export default MainPage;
