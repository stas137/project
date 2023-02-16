import { useTranslation } from 'react-i18next';

interface AboutPageProps {}

const AboutPage = ({}: AboutPageProps) => {
  const { t } = useTranslation('about');

  return (
    <div>
      {t('about-page')}
    </div>
  );
};

export default AboutPage;
