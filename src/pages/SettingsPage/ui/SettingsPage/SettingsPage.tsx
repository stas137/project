import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './SettingsPage.module.scss';
import { Page } from '@/widgets/Page';
import { UIDesignSwitcher } from '@/features/UIDesignSwitcher';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface SettingsPageProps {
  className?: string;
}

const SettingsPage = memo((props: SettingsPageProps) => {
  const { className } = props;

  const { t } = useTranslation();

  return (
    <Page className={classNames(cls.SettingsPage, {}, [className])}>
      <VStack gap="16">
        <Text title={t('settings')} />
        <UIDesignSwitcher />
      </VStack>
    </Page>
  );
});

export default SettingsPage;
