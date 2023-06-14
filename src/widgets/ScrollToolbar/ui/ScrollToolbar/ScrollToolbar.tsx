import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ScrollToTopButton } from '@/features/ScrollToTopButton';

import { VStack } from '@/shared/ui/redesigned/Stack';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ScrollToolbar.module.scss';

interface ScrollToolbarProps {
  className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
  const { className } = props;

  const { t } = useTranslation();

  return (
    <VStack
      className={classNames(cls.ScrollToolbar, {}, [className])}
      justify="center"
      align="center"
    >
      <ScrollToTopButton />
    </VStack>
  );
});
