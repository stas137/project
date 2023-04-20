import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonVariant {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outlineRed',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  fullwidth?: boolean;
  children?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    variant = ButtonVariant.OUTLINE,
    square,
    size = ButtonSize.M,
    disabled,
    fullwidth = false,
    ...otherProps
  } = props;

  const mods: Mods = {
    [cls.square]: square,
    [cls[size]]: true,
    [cls.disabled]: disabled,
    [cls.fullwidth]: fullwidth,
  };

  return (
    <button
      type="button"
      className={classNames(cls.Button, mods, [className, cls[variant]])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
