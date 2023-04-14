import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';

interface ForbiddenPageProps {
  className?: string;
}

export const ForbiddenPage = memo((props: ForbiddenPageProps) => {
  const {
    className,
  } = props;

  const { t } = useTranslation();

  return (
    <Page className={classNames('', {}, [className])}>
      {t('you-do-not-have-access')}
    </Page>
  );
});
