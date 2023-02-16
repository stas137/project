import { BugButton } from 'app/providers/ErrorBoundary';
import { useTranslation } from 'react-i18next';

interface MainPageProps {};

const MainPage = ({}: MainPageProps) => {
  const { t } = useTranslation('main');

  return (
    <div>
      <BugButton />
      {t('main-page')}
    </div>
  );
};

export default MainPage;
