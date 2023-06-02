import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outline' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: CardVariant;
  fullWidth?: boolean;
  padding?: CardPadding;
  children: ReactNode;
}

const mapPaddingToClass: Record<CardPadding, string> = {
  0: 'gap_0',
  8: 'gap_8',
  16: 'gap_16',
  24: 'gap_24',
};

export const Card = memo((props: CardProps) => {
  const {
    className,
    variant = 'normal',
    fullWidth = false,
    padding = '8',
    children,
    ...otherProps
  } = props;

  const paddings = mapPaddingToClass[padding];

  const mods: Mods = {
    [cls.fullWidth]: fullWidth,
  };

  return (
    <div
      className={classNames(cls.Card, mods, [
        className,
        cls[variant],
        cls[paddings],
      ])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
