import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import { Button } from '@/shared/ui/redesigned/Button';

interface LanguageSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LanguageSwitcher = memo((props: LanguageSwitcherProps) => {
  const { className, short = true } = props;

  const { t, i18n } = useTranslation();

  const toggle = async () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button
      variant="clear"
      onClick={toggle}
    >
      {t(short ? 'language-short' : 'language')}
    </Button>
  );
});
