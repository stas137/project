import { useTranslation } from 'react-i18next';
// import { BugButton } from '@/app/providers/ErrorBoundary';
import { Page } from '@/widgets/Page';
import { Counter } from '@/entities/Counter';

const MainPage = () => {
  const { t } = useTranslation('main');

  return (
    <Page data-testid="MainPage">
      <Counter />
      12345
      {/* <BugButton /> */}
      {t('main-page')}
    </Page>
  );
};

export default MainPage;
