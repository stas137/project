import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';
export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  color?: ButtonColor;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      children,
      variant = 'filled',
      square,
      size = 'm',
      disabled,
      fullWidth = false,
      type = 'button',
      color = 'normal',
      addonLeft,
      addonRight,
      ...otherProps
    } = props;

    const mods: Mods = {
      [cls.square]: square,
      [cls.disabled]: disabled,
      [cls.fullWidth]: fullWidth,
      [cls.widthAddon]: Boolean(addonLeft) || Boolean(addonRight),
    };

    return (
      <button
        className={classNames(cls.Button, mods, [
          className,
          cls[variant],
          cls[size],
          cls[color],
        ])}
        ref={ref}
        // eslint-disable-next-line react/button-has-type
        type={type}
        disabled={disabled}
        {...otherProps}
      >
        {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
        {children}
        {addonRight && <div className={cls.addonRight}>{addonRight}</div>}
      </button>
    );
  },
);
