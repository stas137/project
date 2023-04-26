import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Button, ButtonVariant } from '@/shared/ui/Button/Button';

interface LanguageSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LanguageSwitcher = memo(({ className, short }: LanguageSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggle = async () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button
      className={classNames('', {}, [className])}
      variant={ButtonVariant.CLEAR}
      onClick={toggle}
    >
      {t(short ? 'language-short' : 'language')}
    </Button>
  );
});
