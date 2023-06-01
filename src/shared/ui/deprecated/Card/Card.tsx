import { HTMLAttributes, memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardVariant {
  NORMAL = 'normal',
  OUTLINE = 'outline',
}
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: CardVariant;
  fullWidth?: boolean;
  children: ReactNode;
}

/**
 * @deprecated
 */
export const Card = memo((props: CardProps) => {
  const {
    className,
    variant = CardVariant.NORMAL,
    fullWidth = false,
    children,
    ...otherProps
  } = props;

  const { t } = useTranslation();

  const mods: Mods = {
    [cls.fullWidth]: fullWidth,
  };

  return (
    <div
      className={classNames(cls.Card, mods, [className, cls[variant]])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
