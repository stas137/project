import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '../Stack';

import AppSvg from '@/shared/assets/icons/app-image.svg';
import cls from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo = memo((props: AppLogoProps) => {
  const { className, size } = props;

  const { t } = useTranslation();

  return (
    <HStack
      className={classNames(cls.AppLogoWrapper, {}, [className])}
      justify="center"
    >
      <AppSvg
        className={cls.appLogo}
        width={size}
        height={size}
        color="black"
      />
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
    </HStack>
  );
});
