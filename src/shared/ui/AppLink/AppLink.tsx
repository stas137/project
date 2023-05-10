import { ReactNode, forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RED = 'red',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  children?: ReactNode;
}

export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>((props, ref) => {
  const {
    to,
    className,
    children,
    variant = AppLinkVariant.PRIMARY,
    ...otherProps
  } = props;

  return (
    <Link
      className={classNames(cls.AppLink, {}, [className, cls[variant]])}
      to={to}
      ref={ref}
      {...otherProps}
    >
      {children}
    </Link>
  );
});
