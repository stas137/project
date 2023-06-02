import { ReactNode, forwardRef } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'secondary' | 'red';

interface AppLinkProps extends LinkProps {
  className?: string;
  activeClassName?: string;
  variant?: AppLinkVariant;
  children?: ReactNode;
}

export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(
  (props, ref) => {
    const {
      to,
      className,
      activeClassName = '',
      children,
      variant = 'primary',
      ...otherProps
    } = props;

    return (
      <NavLink
        className={({ isActive }) =>
          classNames(cls.AppLink, { [activeClassName]: isActive }, [
            className,
            cls[variant],
          ])
        }
        to={to}
        ref={ref}
        {...otherProps}
      >
        {children}
      </NavLink>
    );
  },
);
