import { HTMLAttributes, memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardVariant {
  NORMAL = 'normal',
  OUTLINE = 'outline'
}
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
}

export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    variant = CardVariant.NORMAL,
    ...otherProps
  } = props;

  const { t } = useTranslation();

  return (
    <div
      className={classNames(cls.Card, {}, [className, cls[variant]])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
